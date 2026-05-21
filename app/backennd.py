from flask import Flask, render_template, request, jsonify, send_from_directory
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os
import cv2
from werkzeug.utils import secure_filename
from google import genai
from PIL import Image
import json

# ============================================
# KONFIGURASI PATH
# ============================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_DIR = os.path.join(BASE_DIR, 'template')
MODEL_DIR = os.path.join(BASE_DIR, 'model')
UPLOAD_DIR = os.path.join(BASE_DIR, 'uploads')

app = Flask(__name__, template_folder=TEMPLATE_DIR)

# ============================================
# KONFIGURASI GEMINI
# ============================================

GEMINI_API_KEY = "AIzaSyBu7u0IJYbi4Ej8Qi_zqBo0JyVz3hwYGgw"  # Ganti dengan API key asli Anda
client = genai.Client(api_key=GEMINI_API_KEY)

# ============================================
# PROMPT VALIDASI GEMINI (PANGGILAN 1)
# ============================================

VALIDATION_PROMPT = """
Anda adalah ahli agronomi. Analisis gambar ini dan jawab dengan format JSON STRICT:

{
    "is_rice_leaf": true/false,
    "confidence": 0.0-1.0,
    "reason": "alasan singkat (maksimal 20 kata)"
}

Rules:
- is_rice_leaf: TRUE jika gambar adalah FOTO ASLI daun padi (warna hijau, bentuk memanjang, ada tulang daun)
- BUKAN daun padi jika: diagram, flowchart, skema, ilustrasi, teks, hewan, mobil, atau daun tanaman lain

Hanya balas dengan JSON, tanpa teks tambahan!
"""

# ============================================
# PROMPT REKOMENDASI GEMINI (PANGGILAN 2) - GENERATE SENDIRI
# ============================================

def get_recommendation_prompt(disease_name, confidence):
    """Membuat prompt untuk Gemini agar generate rekomendasi sendiri"""
    return f"""
Anda adalah ahli agronomi dan penyakit tanaman padi dengan pengalaman lebih dari 20 tahun.

Penyakit yang terdeteksi pada daun padi: {disease_name}
Tingkat keyakinan deteksi: {confidence * 100:.1f}%

Berdasarkan PENGETAHUAN ANDA SENDIRI sebagai ahli, berikan rekomendasi penanganan yang lengkap, akurat, dan praktis untuk petani.

Format output JSON STRICT (jangan tambahkan teks lain di luar JSON):
{{
    "description": "deskripsi singkat penyakit ini (1-2 kalimat)",
    "causes": ["penyebab1", "penyebab2", "penyebab3"],
    "symptoms": ["gejala1", "gejala2", "gejala3", "gejala4"],
    "chemical_control": "nama fungisida/pestisida yang efektif (jika ada)",
    "organic_control": "solusi organik atau alami yang bisa dilakukan petani",
    "prevention_tips": ["tips1", "tips2", "tips3", "tips4"],
    "estimated_recovery": "perkiraan waktu pemulihan tanaman setelah penanganan"
}}

CATATAN PENTING:
- Jika penyakit adalah "normal" (tanaman sehat), berikan tips perawatan rutin
- Jika penyakit adalah hama (seperti hispa, dead heart), berikan rekomendasi pengendalian hama
- Gunakan bahasa Indonesia yang mudah dipahami petani
- Berikan solusi yang praktis dan aplikatif di lapangan
"""

# ============================================
# ROUTE UNTUK FILE CSS DAN JS
# ============================================

@app.route('/style.css')
def serve_css():
    return send_from_directory(TEMPLATE_DIR, 'style.css')

@app.route('/script.js')
def serve_js():
    return send_from_directory(TEMPLATE_DIR, 'script.js')

# ============================================
# KONFIGURASI UPLOAD
# ============================================

app.config['UPLOAD_FOLDER'] = UPLOAD_DIR
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

os.makedirs(UPLOAD_DIR, exist_ok=True)

# ============================================
# LOAD MODEL
# ============================================

MODEL_PATH = os.path.join(MODEL_DIR, 'model.h5')
IMG_SIZE = 224
CLASS_NAMES = ['Leaf smut', 'bacterial_leaf_blight', 'bacterial_leaf_streak', 'bacterial_panicle_blight', 'blast', 'brown_spot', 'dead_heart', 'downy_mildew', 'hispa', 'normal', 'tungro']

print("🚀 Loading model...")
print(f"   Model path: {MODEL_PATH}")

try:
    model = load_model(MODEL_PATH)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# ============================================
# FUNGSI VALIDASI DENGAN GEMINI (PANGGILAN 1)
# ============================================

def validate_with_gemini(image_path):
    """Validasi gambar menggunakan Gemini API"""
    try:
        img = Image.open(image_path)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[VALIDATION_PROMPT, img]
        )
        
        response_text = response.text.strip()
        
        # Bersihkan markdown
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.startswith('```'):
            response_text = response_text[3:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        
        result = json.loads(response_text)
        result['validation_method'] = 'gemini_ai'
        return result
        
    except Exception as e:
        print(f"❌ Gemini validation error: {e}")
        return {
            'is_rice_leaf': False,
            'confidence': 0.0,
            'reason': f'Error validasi: {str(e)[:50]}',
            'validation_method': 'error'
        }

# ============================================
# FUNGSI REKOMENDASI DENGAN GEMINI (PANGGILAN 2) - GENERATE SENDIRI
# ============================================

def get_recommendation_from_gemini(disease_name, confidence):
    """Gemini membuat rekomendasi berdasarkan pengetahuannya sendiri"""
    
    # Kasus khusus untuk tanaman sehat
    if disease_name.lower() == 'normal':
        return {
            "disease": "Tanaman Sehat (Normal)",
            "description": "Tanaman padi Anda terdeteksi dalam kondisi sehat. Tidak ditemukan gejala penyakit atau serangan hama yang signifikan.",
            "causes": ["Tidak ada penyebab penyakit karena tanaman sehat"],
            "symptoms": ["Daun berwarna hijau segar", "Tidak ada bercak atau lubang pada daun", "Pertumbuhan normal dan vigor"],
            "chemical_control": "Tidak diperlukan pestisida",
            "organic_control": "Lanjutkan perawatan organik yang sudah baik",
            "prevention_tips": [
                "Lakukan pengecekan rutin setiap 5-7 hari",
                "Jaga kebersihan lahan dari gulma",
                "Berikan pupuk berimbang sesuai kebutuhan",
                "Pastikan drainase air berjalan baik"
            ],
            "estimated_recovery": "Tanaman tetap sehat dengan perawatan rutin"
        }
    
    try:
        prompt = get_recommendation_prompt(disease_name, confidence)
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[prompt]
        )
        
        response_text = response.text.strip()
        
        # Bersihkan markdown
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.startswith('```'):
            response_text = response_text[3:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        
        result = json.loads(response_text)
        result['disease'] = disease_name
        return result
        
    except Exception as e:
        print(f"❌ Gemini recommendation error: {e}")
        # Fallback jika Gemini error
        return {
            "disease": disease_name,
            "description": f"Terdeteksi penyakit {disease_name} pada daun padi.",
            "causes": ["Infeksi patogen", "Kondisi lingkungan yang mendukung perkembangan penyakit"],
            "symptoms": ["Gejala khas pada daun sesuai jenis penyakit"],
            "chemical_control": "Konsultasikan dengan penyuluh pertanian setempat",
            "organic_control": "Gunakan pestisida nabati atau agen hayati",
            "prevention_tips": [
                "Lakukan rotasi tanaman",
                "Jaga kebersihan lahan",
                "Gunakan bibit unggul tahan penyakit",
                "Atur jarak tanam tidak terlalu rapat"
            ],
            "estimated_recovery": "7-14 hari dengan penanganan yang tepat"
        }

# ============================================
# FUNGSI BANTUAN
# ============================================

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    img = load_img(image_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def predict_disease(image_path):
    """Prediksi penyakit dari gambar menggunakan model CNN"""
    if model is None:
        return {
            'predicted_class': 'Error',
            'confidence': 0,
            'all_probabilities': {}
        }
    
    img_array = preprocess_image(image_path)
    predictions = model.predict(img_array)[0]
    
    predicted_class = CLASS_NAMES[np.argmax(predictions)]
    confidence = float(np.max(predictions))
    all_probabilities = {
        CLASS_NAMES[i]: float(predictions[i]) 
        for i in range(len(CLASS_NAMES))
    }
    
    return {
        'predicted_class': predicted_class,
        'confidence': confidence,
        'all_probabilities': all_probabilities
    }

# ============================================
# ROUTE ENDPOINTS UTAMA
# ============================================

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """
    Alur lengkap:
    1. Validasi dengan Gemini (apakah ini daun padi?)
    2. Jika YA, prediksi dengan model CNN
    3. Gemini generate rekomendasi berdasarkan pengetahuannya sendiri
    4. Kembalikan semua hasil
    """
    try:
        # ========================================
        # CEK FILE UPLOAD
        # ========================================
        if 'image' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed. Use PNG, JPG, or JPEG'}), 400
        
        # Simpan file sementara
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # ========================================
        # PANGGILAN 1: VALIDASI DENGAN GEMINI
        # ========================================
        print("📋 [1/3] Validasi gambar dengan Gemini...")
        validation_result = validate_with_gemini(filepath)
        
        if not validation_result.get('is_rice_leaf', False):
            os.remove(filepath)
            return jsonify({
                'status': 'rejected',
                'message': 'Gambar tidak dikenali sebagai daun padi',
                'validation': validation_result
            }), 400
        
        print("✅ [1/3] Validasi berhasil! Gambar dikenali sebagai daun padi")
        
        # ========================================
        # PANGGILAN 2: DETEKSI DENGAN MODEL CNN
        # ========================================
        print("🧠 [2/3] Memprediksi penyakit dengan model CNN...")
        prediction_result = predict_disease(filepath)
        disease_name = prediction_result.get('predicted_class')
        confidence_score = prediction_result.get('confidence')
        print(f"✅ [2/3] Prediksi selesai! Penyakit: {disease_name} (confidence: {confidence_score:.2%})")
        
        # ========================================
        # PANGGILAN 3: REKOMENDASI DENGAN GEMINI (GENERATE SENDIRI)
        # ========================================
        print("💊 [3/3] Gemini sedang membuat rekomendasi penanganan...")
        recommendation_result = get_recommendation_from_gemini(disease_name, confidence_score)
        print(f"✅ [3/3] Rekomendasi selesai!")
        
        # ========================================
        # HAPUS FILE SEMENTARA
        # ========================================
        os.remove(filepath)
        
        # ========================================
        # KEMBALIKAN SEMUA HASIL
        # ========================================
        return jsonify({
            'status': 'success',
            'validation': validation_result,
            'prediction': prediction_result,
            'recommendation': recommendation_result
        })
    
    except Exception as e:
        print(f"❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# ============================================
# ENDPOINT TAMBAHAN (VALIDASI SAJA)
# ============================================

@app.route('/validate-only', methods=['POST'])
def validate_only():
    """Endpoint khusus untuk validasi dengan Gemini saja (tanpa prediksi)"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400
        
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        result = validate_with_gemini(filepath)
        
        os.remove(filepath)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================
# HEALTH CHECK
# ============================================

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok', 
        'model_loaded': model is not None,
        'gemini_available': True,
        'validator': 'gemini_ai'
    })

# ============================================
# MENJALANKAN APLIKASI
# ============================================

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🌾 APLIKASI DETEKSI PENYAKIT DAUN PADI")
    print("🤖 DENGAN VALIDASI GEMINI + REKOMENDASI AI (GENERATE SENDIRI)")
    print("="*60)
    print("📋 ALUR:")
    print("   1. Validasi gambar (Gemini) → Apakah ini daun padi?")
    print("   2. Deteksi penyakit (Model CNN) → 11 kelas penyakit")
    print("   3. Rekomendasi (Gemini) → GENERATE SENDIRI berdasarkan pengetahuan AI")
    print("="*60)
    print("⚠️  CATATAN: Rekomendasi dihasilkan oleh AI, verifikasi sebelum praktik lapangan")
    print("="*60)
    print(f"📁 Struktur folder:")
    print(f"   - Base dir    : {BASE_DIR}")
    print(f"   - Model       : {MODEL_PATH}")
    print(f"   - Template    : {TEMPLATE_DIR}")
    print(f"   - Uploads     : {UPLOAD_DIR}")
    print("="*60)
    print("🌐 Buka browser di: http://localhost:5000")
    print("="*60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)