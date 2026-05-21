from flask import Flask, render_template, request, jsonify, send_from_directory
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os
import cv2
from werkzeug.utils import secure_filename

# ============================================
# KONFIGURASI PATH
# ============================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_DIR = os.path.join(BASE_DIR, 'template')
MODEL_DIR = os.path.join(BASE_DIR, 'model')
UPLOAD_DIR = os.path.join(BASE_DIR, 'uploads')

app = Flask(__name__, template_folder=TEMPLATE_DIR)

# ============================================
# ROUTE UNTUK FILE CSS DAN JS
# ============================================

@app.route('/style.css')
def serve_css():
    """Melayani file style.css dari folder template"""
    return send_from_directory(TEMPLATE_DIR, 'style.css')

@app.route('/script.js')
def serve_js():
    """Melayani file script.js dari folder template"""
    return send_from_directory(TEMPLATE_DIR, 'script.js')

# ============================================
# KONFIGURASI UPLOAD
# ============================================

app.config['UPLOAD_FOLDER'] = UPLOAD_DIR
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

# Buat folder uploads jika belum ada
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ============================================
# LOAD MODEL
# ============================================

MODEL_PATH = os.path.join(MODEL_DIR, 'model.h5')
IMG_SIZE = 224
CLASS_NAMES = ['Leaf smut', 'bacterial_leaf_blight', 'bacterial_leaf_streak', 'bacterial_panicle_blight', 'blast', 'brown_spot', 'dead_heart', 'downy_mildew', 'hispa', 'normal', 'tungro']
print(" Loading model...")
print(f"   Model path: {MODEL_PATH}")

try:
    model = load_model(MODEL_PATH)
    print(" Model loaded successfully!")
except Exception as e:
    print(f" Error loading model: {e}")
    model = None

# ============================================
#  VALIDASI SEDERHANA DAUN PADI
# ============================================

def is_rice_leaf_simple(image_path):
    """
    Validasi sederhana untuk memastikan gambar adalah daun padi
    Menggunakan deteksi warna hijau dan edge detection
    """
    # Baca gambar
    img = cv2.imread(image_path)
    if img is None:
        return False, 0, 0, "Gambar tidak dapat dibaca"
    
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # 1. Deteksi warna hijau (daun padi dominan hijau)
    hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
    lower_green = np.array([25, 40, 40])
    upper_green = np.array([85, 255, 255])
    green_mask = cv2.inRange(hsv, lower_green, upper_green)
    green_ratio = np.count_nonzero(green_mask) / (img.shape[0] * img.shape[1])
    
    # 2. Deteksi tepi (edge detection) untuk tekstur daun
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    edge_density = np.count_nonzero(edges) / (img.shape[0] * img.shape[1])
    
    # 3. Hitung rata-rata warna (opsional, untuk tambahan)
    mean_green = np.mean(img[:, :, 1])  # channel hijau
    
    # Threshold yang sudah disesuaikan (cukup longgar)
    GREEN_THRESHOLD = 0.10      
    EDGE_THRESHOLD = 0.01      
    
    is_leaf = (green_ratio > GREEN_THRESHOLD) and (edge_density > EDGE_THRESHOLD)
    
    # Pesan keterangan
    if is_leaf:
        message = f"Validasi berhasil: {green_ratio*100:.1f}% area hijau, {edge_density*100:.1f}% tepi"
    else:
        if green_ratio <= GREEN_THRESHOLD:
            message = f"Gambar ditolak: hanya {green_ratio*100:.1f}% area berwarna hijau (minimal {GREEN_THRESHOLD*100:.0f}%)"
        elif edge_density <= EDGE_THRESHOLD:
            message = f"Gambar ditolak: hanya {edge_density*100:.1f}% area tepi (minimal {EDGE_THRESHOLD*100:.0f}%)"
        else:
            message = "Gambar ditolak: tidak memenuhi kriteria daun padi"
    
    return is_leaf, green_ratio, edge_density, message

# ============================================
# FUNGSI BANTUAN
# ============================================

def allowed_file(filename):
    """Cek apakah file gambar valid"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    """Preprocessing gambar sebelum prediksi"""
    img = load_img(image_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def predict_disease(image_path):
    """Prediksi penyakit dari gambar"""
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
# ROUTE ENDPOINTS
# ============================================

@app.route('/')
def index():
    """Halaman utama"""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint untuk prediksi gambar dengan validasi daun padi"""
    try:
        # Cek apakah ada file yang diupload
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
        # VALIDASI APAKAH GAMBAR ADALAH DAUN PADI
        # ========================================
        is_leaf, green_ratio, edge_density, validation_message = is_rice_leaf_simple(filepath)
        
        # Jika BUKAN daun padi, tolak prediksi
        if not is_leaf:
            os.remove(filepath)
            return jsonify({
                'error': 'Gambar tidak dikenali sebagai daun padi',
                'error_code': 'NOT_RICE_LEAF',
                'validation': {
                    'is_rice_leaf': False,
                    'green_ratio_percent': round(green_ratio * 100, 2),
                    'edge_density_percent': round(edge_density * 100, 2),
                    'message': validation_message
                },
                'message': 'Mohon upload gambar daun padi yang jelas (berwarna hijau dan menunjukkan tekstur daun)'
            }), 400
        
        # ========================================
        # LANJUTKAN PREDIKSI PENYAKIT
        # ========================================
        result = predict_disease(filepath)
        
        # Tambahkan informasi validasi ke hasil
        result['validation_passed'] = True
        result['validation'] = {
            'green_ratio_percent': round(green_ratio * 100, 2),
            'edge_density_percent': round(edge_density * 100, 2),
            'message': validation_message
        }
        
        # Hapus file sementara
        os.remove(filepath)
        
        return jsonify(result)
    
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/validate-only', methods=['POST'])
def validate_only():
    """Endpoint khusus untuk validasi saja (tanpa prediksi)"""
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
        
        # Lakukan validasi
        is_leaf, green_ratio, edge_density, message = is_rice_leaf_simple(filepath)
        
        os.remove(filepath)
        
        return jsonify({
            'is_rice_leaf': is_leaf,
            'green_ratio_percent': round(green_ratio * 100, 2),
            'edge_density_percent': round(edge_density * 100, 2),
            'message': message
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok', 
        'model_loaded': model is not None,
        'validator_ready': True
    })

@app.route('/validation-thresholds', methods=['GET'])
def get_thresholds():
    """Endpoint untuk mendapatkan nilai threshold validasi"""
    return jsonify({
        'min_green_ratio_percent': 10,
        'min_edge_density_percent': 1,
        'description': 'Gambar harus memiliki minimal 10% area hijau dan 1% area tepi'
    })

# ============================================
# MENJALANKAN APLIKASI
# ============================================

if __name__ == '__main__':
    print("\n" + "="*60)
    print(" MENJALANKAN APLIKASI DETEKSI PENYAKIT DAUN PADI")
    print(" DENGAN VALIDASI GAMBAR SEDERHANA")
    print("="*60)
    print(f" Struktur folder:")
    print(f"   - Base dir    : {BASE_DIR}")
    print(f"   - App.py      : {os.path.abspath(__file__)}")
    print(f"   - Model       : {MODEL_PATH}")
    print(f"   - Template    : {TEMPLATE_DIR}")
    print(f"   - Uploads     : {UPLOAD_DIR}")
    print("="*60)
    print(" Kriteria validasi daun padi:")
    print(f"   - Minimal warna hijau: 10% area gambar")
    print(f"   - Minimal tepi/tekstur: 1% area gambar")
    print("="*60)
    print(" 🌐 Buka browser di: http://localhost:5000")
    print("="*60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)