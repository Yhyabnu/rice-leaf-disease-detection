// Database Informasi Penyakit (Lengkap dengan gejala spesifik)
const diseaseDatabase = {
    "Leaf_smut": {
        "icon": "⚫",
        "description": "Leaf Smut (Belulang Daun) disebabkan oleh jamur Entyloma oryzae. Penyakit ini muncul menjelang panen dengan bercak hitam seperti jelaga pada daun.",
        "symptoms": [
            "Bercak berbentuk garis pendek (1-4 mm) berwarna hitam seperti jelaga, agak menonjol",
            "Bercak berada di antara urat-urat daun, sejajar dengan tulang daun",
            "Jaringan di sekitar bercak hitam sering menguning",
            "Pada serangan berat, bercak hitam menyatu menyebabkan daun mengering sebelum waktunya",
            "Pada kasus ekstrem, ujung daun dapat robek seperti serat"
        ],
        "treatment": [
            "Gunakan varietas padi yang memiliki ketahanan terhadap Leaf Smut",
            "Jangan mengembalikan jerami atau sisa tanaman sakit ke lahan (sanitasi)",
            "Pupuk dengan fosfor (P) dan kalium (K) yang cukup - tanah miskin P dan K meningkatkan keparahan penyakit",
            "Penyemprotan untuk penyakit lain (blast, hawar daun) biasanya sudah mencakup pengendalian leaf smut",
            "Penyemprotan fungisida khusus umumnya tidak diperlukan"
        ]
    },
    "bacterial_leaf_blight": {
        "icon": "🟡",
        "description": "Hawar Daun Bakteri (Bacterial Leaf Blight) disebabkan oleh bakteri Xanthomonas oryzae pv. oryzae. Penyakit ini sangat merusak dengan ciri khas gejala 'kresek' seperti terbakar.",
        "symptoms": [
            "Gejala awal: garis basah (water-soaked) pada tepi daun bagian bawah",
            "Garis bergelombang berwarna kuning keputihan hingga hijau pucat di sepanjang tulang daun",
            "Pada varietas rentan: daun menggulung, mengering, berwarna abu-abu keputihan seperti terkena api (gejala 'kresek')",
            "Tahap akhir: seluruh daun mengering, hanya menyisakan tulang daun tengah",
            "Dapat menyerang semua fase pertumbuhan, dari bibit hingga dewasa"
        ],
        "treatment": [
            "Gunakan varietas tahan BLB (cara paling efektif, andal, dan murah)",
            "Gunakan bibit sehat dari sumber terpercaya",
            "Kurangi pemupukan nitrogen berlebih - nitrogen berlebihan meningkatkan kerentanan",
            "Pastikan drainase sawah dan pembibitan baik, hindari genangan berlebihan",
            "Bersihkan gulma inang, bajak jerami dan tunggul padi",
            "Biarkan lahan mengering (fallow) untuk menekan patogen di tanah",
            "Aplikasi bakterisida berbahan tembaga hanya jika diperlukan"
        ]
    },
    "bacterial_leaf_streak": {
        "icon": "📏",
        "description": "Bacterial Leaf Streak (BLS) disebabkan oleh Xanthomonas oryzae pv. oryzicola. Ciri khasnya adalah garis-garis sempit di antara urat daun.",
        "symptoms": [
            "Garis-garis pendek (1-5 cm) hijau pucat dan tembus cahaya (water-soaked) di antara tulang-tulang daun",
            "Garis berubah menjadi coklat kemerahan hingga oranye, berbentuk sempit sejajar urat daun",
            "Lesi TERBATAS oleh urat daun - tidak melebar melampaui urat (beda dengan BLB)",
            "Pada pagi lembab, terlihat tetesan eksudat bakteri berwarna kuning di permukaan lesi",
            "Banyak lesi dapat menyatu menyebabkan daun mengering"
        ],
        "treatment": [
            "Perendaman benih: Agrimycin 100-250 ppm (2,5 g/10 kg benih) 12 jam + air panas 52°C 30 menit",
            "Di area endemik: rendam dalam bleaching powder (100 g/L) dan ZnSO₄ (2%)",
            "Aplikasi pupuk urea berlapis neem (neem cake coated urea)",
            "Berikan kalium 50% lebih tinggi dari dosis normal secara split",
            "Semprot ekstrak kotoran sapi segar (20 g/L air, supernatan 500 L/ha)",
            "Semprot Azadirachtin 0,03% EC (2,5 L/ha) saat gejala awal",
            "Pada kasus berat: Streptocycline (15 g/300 L air/ha) atau Agrimycin 100 (750 g/500 L air/ha)"
        ]
    },
    "bacterial_panicle_blight": {
        "icon": "🌾",
        "description": "Bacterial Panicle Blight (BPB) disebabkan oleh bakteri Burkholderia glumae. Menyerang malai pada fase pembungaan, menyebabkan bulir hampa.",
        "symptoms": [
            "Malai tampak tegak (upright), berwarna jerami pucat atau keputihan kontras dengan daun hijau",
            "Bulir berubah dari hijau muda menjadi coklat pucat hingga coklat, dimulai dari pangkal glume",
            "Terdapat batas berwarna merah-coklat yang memisahkan area terinfeksi dengan bagian sehat",
            "Bulir terinfeksi tetap hampa atau hanya terisi sebagian (kisut)",
            "Pada tangkai malai (rachis) muncul garis-garis coklat hingga hitam"
        ],
        "treatment": [
            "Gunakan Bacillus velezensis JBCS608 (1 × 10⁸ CFU/mL) - efektivitas hingga 68,9%",
            "Agen hayati alternatif: Pseudomonas protegens PBL3 atau Burkholderia cepacia PBL18",
            "Atur waktu tanam - hindari musim hujan saat pembungaan (kondisi hangat lembab memicu penyakit)",
            "Aplikasi bakterisida sebelum pembentukan malai (preventif)",
            "Hindari pemupukan nitrogen saat fase reproduktif",
            "Panen tepat waktu saat 80-85% biji menguning"
        ]
    },
    "blast": {
        "icon": "🔥",
        "description": "Penyakit Blas (Blast) disebabkan oleh jamur Pyricularia oryzae. Penyakit paling merusak pada padi secara global dengan ciri bercak belah ketupat.",
        "symptoms": [
            "Bercak berbentuk BELAH KETUPAT (diamond-shaped) atau seperti mata ikan",
            "Tepi bercak berwarna coklat kemerahan hingga keunguan, bagian tengah abu-abu putih kehijauan",
            "Bercak bervariasi dari bintik kecil seperti jarum hingga bercak besar yang dapat menyatu",
            "Pada serangan berat: daun tampak hangus seperti terbakar",
            "Pada fase bibit: tanaman dapat mati total (blast bibit)"
        ],
        "treatment": [
            "Gunakan varietas tahan blast seperti Inpari dan Ciherang",
            "Aplikasi Pseudomonas fluorescens strain 7-14 (menekan perkecambahan konidia 90-92%)",
            "Perlakuan benih dengan Pseudomonas fluorescens atau Bacillus spp.",
            "Perlakuan kombinasi (benih + penyemprotan) memberikan hasil terbaik",
            "Aplikasi fungisida tricyclazole atau isoprothiolane secara preventif",
            "Jaga kelembaban dengan pengaturan jarak tanam",
            "Pemupukan berimbang - hindari nitrogen berlebihan"
        ]
    },
    "brown_spot": {
        "icon": "🟤",
        "description": "Bercak Coklat (Brown Spot) disebabkan oleh jamur Cochliobolus miyabeanus (anamorf: Bipolaris oryzae). Sering muncul pada lahan dengan unsur hara tidak seimbang.",
        "symptoms": [
            "Bercak bulat hingga oval, kadang agak memanjang",
            "Bagian tengah coklat tua hingga abu-abu pucat, dikelilingi pinggiran coklat kemerahan atau kuning (seperti halo)",
            "Bercak dapat muncul di seluruh permukaan daun, dari muda hingga tua",
            "Pada serangan berat: bercak menyatu membentuk area nekrotik besar",
            "Pada bibit: dapat menyebabkan seedling blight (kematian bibit)"
        ],
        "treatment": [
            "Fungisida paling efektif: Tebuconazole 25,9% EC",
            "Agen hayati terbaik: kombinasi Trichoderma harzianum + Pseudomonas fluorescens (hasil panen tertinggi)",
            "Perendaman benih dengan fungisida sebelum tanam",
            "Perbaiki drainase lahan agar tidak tergenang terus",
            "Aplikasi pupuk kalium untuk meningkatkan ketahanan tanaman",
            "Gunakan benih bersertifikat bebas penyakit"
        ]
    },
    "dead_heart": {
        "icon": "💀",
        "description": "Dead Heart (Hati Mati) disebabkan oleh serangan LARVA penggerek batang padi (Scirpophaga incertulas) pada FASE VEGETATIF. BUKAN penyakit jamur/bakteri.",
        "symptoms": [
            "Daun pusat (daun termuda/pucuk) mengering, berwarna kuning hingga coklat",
            "Daun pusat mudah dicabut dari pangkalnya",
            "Ketika batang dibelah, terlihat lubang gerekan dan jaringan muda di dalamnya rusak/hilang dimakan larva",
            "Terjadi pada FASE VEGETATIF (tanaman anakan hingga sebelum pembentukan malai)",
            "BEDA dengan White Head - white head terjadi pada fase generatif (malai putih hampa)"
        ],
        "treatment": [
            "HINDARI penyemprotan daun - tidak efektif karena larva di DALAM batang",
            "Lindungi musuh alami: jangan semprot insektisida pada 30-40 hari pertama setelah tanam",
            "Pemantauan: pantau kelompok telur (egg masses) pada daun, BUKAN menunggu gejala deadheart",
            "Setelah panen: BAJAK tunggul padi untuk menghilangkan sumber makanan larva",
            "Lakukan penanaman serempak dalam satu wilayah untuk memutus siklus hidup hama",
            "Ambang kendali: >30% tanaman menunjukkan gejala deadheart pada fase anakan"
        ]
    },
    "downy_mildew": {
        "icon": "🌫️",
        "description": "Downy Mildew (Bulu Palsu) disebabkan oleh jamur Sclerophthora macrospora. Ciri khasnya adalah adanya bulu putih seperti beludru di bawah daun.",
        "symptoms": [
            "Bercak tidak beraturan hijau pucat hingga kuning (klorosis) pada permukaan ATAS daun",
            "Pada sisi BAWAH daun, tepat di bawah bercak kuning, muncul lapisan seperti BELUDRU atau tepung berwarna PUTIH hingga abu-abu",
            "Daun terinfeksi menjadi pendek, kaku, tebal, kadang bergelombang atau menggulung",
            "Bercak meluas, mengering, berubah menjadi coklat nekrotik",
            "Tanaman secara keseluruhan menjadi kerdil dengan jumlah anakan berkurang"
        ],
        "treatment": [
            "Perendaman benih: CuSO₄ 0,1% selama 6-8 jam",
            "Perlakuan tanah persemaian: siram CuSO₄ (1 g/m²) setelah tanam",
            "Setelah drainase (pasca banjir), semprot Pocampuran Bordeaux (1:1:240) segera",
            "Penyemprotan kimia saat gejala: Metalaxyl 25% WP atau Aluminium fosetil 40%",
            "Semprot setiap 5-7 hari, 2-3 kali",
            "Rotasi padi-palawija, pilih lahan persemaian dengan elevasi lebih tinggi",
            "Cabut dan bakar tanaman sakit segera"
        ]
    },
    "hispa": {
        "icon": "🐛",
        "description": "Hama Hispa (Dicladispa armigera) adalah KUMBANG pemakan daun, BUKAN penyakit. Kumbang dewasa berwarna biru tua/kehitaman dengan duri di seluruh tubuh.",
        "symptoms": [
            "Gejala LARVA: garis-garis putih memanjang tidak beraturan (larva MENAMBANG di dalam daun)",
            "Gejala KUMBANG DEWASA: garis-garis putih sempit sejajar tulang daun (mengerok permukaan atas)",
            "Daun tampak seperti 'dikerok' atau seperti tulang ikan (transparan karena hanya epidermis bawah tersisa)",
            "Pada populasi tinggi, daun mengering dan tampak seperti 'terbakar'",
            "Daun berlubang-lubang kecil tidak beraturan pada serangan berat"
        ],
        "treatment": [
            "Manfaatkan predator alami: laba-laba dan kumbang koksi (Coccinella)",
            "Aplikasi insektisida hayati Beauveria bassiana",
            "Bersihkan gulma di sekitar sawah yang menjadi inang alternatif",
            "Lakukan sanitasi lahan dari sisa tanaman dan gulma",
            "Insektisida kimia (karbofuran atau klorpirifos) hanya jika populasi sangat tinggi",
            "Gunakan perangkap lampu untuk kumbang dewasa"
        ]
    },
    "normal": {
        "icon": "✅",
        "description": "Selamat! Tanaman padi Anda terdeteksi dalam kondisi SEHAT. Tidak ditemukan gejala serangan hama atau penyakit yang signifikan.",
        "symptoms": [
            "Daun berwarna hijau segar merata, tidak ada bercak atau garis abnormal",
            "Tekstur daun normal (halus atau agak kasar sesuai varietas), tidak ada lubang atau goresan",
            "Daun tegak atau agak melengkung alami, tidak ada penggulungan abnormal",
            "Pertumbuhan tanaman normal dan vigor, anakan produktif",
            "Ukuran daun normal sesuai fase pertumbuhan, tidak kerdil atau terlalu memanjang"
        ],
        "treatment": [
            "Lanjutkan perawatan rutin yang baik (pemupukan berimbang dan pengairan teratur)",
            "Pantau secara berkala setiap 5-7 hari untuk deteksi dini gejala penyakit",
            "Jaga kebersihan lahan dari gulma dan sisa tanaman sakit",
            "Pastikan kebutuhan air dan nutrisi terpenuhi dengan baik",
            "Lakukan praktik budidaya baik: sanitasi lahan, pengairan tepat, rotasi tanaman"
        ]
    },
    "tungro": {
        "icon": "🟠",
        "description": "Penyakit Tungro (Mentek) disebabkan oleh kompleks virus RTBV + RTSV, ditularkan oleh wereng hijau (Nephotettix virescens). Sangat merusak dan cepat menyebar.",
        "symptoms": [
            "Daun berubah warna menjadi KUNING-ORANYE hingga JINGGA KEMERAHAN, dimulai dari ujung daun",
            "Pada daun tua: muncul bintik-bintik kecil berwarna KARAT (rusty necrotic spots)",
            "Daun termuda yang baru muncul seringkali TERPUNTIR (twisted)",
            "Tanaman tumbuh sangat KERDIL dan pendek (stunting), anakan berkurang drastis",
            "Penyakit tidak merata di sawah - muncul dalam KELOMPOK atau bercak-bercak (patchy distribution)",
            "Malai kecil, tidak sempurna, sebagian besar HAMPA (steril)"
        ],
        "treatment": [
            "Gunakan varietas tahan tungro (Inpari 13, Inpari 30, atau varietas lokal seperti Kamba Bulili)",
            "Lakukan penanaman serempak dalam satu wilayah untuk memutus siklus wereng hijau",
            "Cabut dan BAKAR tanaman yang menunjukkan gejala tungro segera",
            "Bersihkan gulma inang virus di sekitar lahan",
            "Pantau populasi wereng hijau - gunakan insektisida hanya saat melebihi ambang kendali",
            "Gunakan perangkap lampu untuk mengurangi populasi wereng",
            "Lakukan rotasi dengan tanaman BUKAN padi (jagung, kedelai) minimal 1-2 musim"
        ]
    }
};

// Format nama penyakit untuk display
function formatDiseaseName(name) {
    return name.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Tampilkan toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = '#48bb78';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#f56565';
    } else if (type === 'info') {
        toastIcon.className = 'fas fa-info-circle';
        toastIcon.style.color = '#4299e1';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Buat particle background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
    }
}

// Simulate loading steps
async function simulateLoadingSteps() {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const progressStep1 = document.getElementById('progressStep1');
    const progressStep2 = document.getElementById('progressStep2');
    const progressStep3 = document.getElementById('progressStep3');
    
    step1.classList.add('active');
    progressStep1.classList.add('active');
    await delay(1500);
    
    step1.classList.remove('active');
    step1.classList.add('completed');
    progressStep1.classList.remove('active');
    progressStep1.classList.add('completed');
    
    step2.classList.add('active');
    progressStep2.classList.add('active');
    await delay(1500);
    
    step2.classList.remove('active');
    step2.classList.add('completed');
    progressStep2.classList.remove('active');
    progressStep2.classList.add('completed');
    
    step3.classList.add('active');
    progressStep3.classList.add('active');
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Display result with animation
function displayResult(result) {
    const diseaseName = result.predicted_class;
    const confidence = (result.confidence * 100).toFixed(2);
    const allProbabilities = result.all_probabilities;
    
    // Get disease info
    const diseaseInfo = diseaseDatabase[diseaseName] || {
        icon: '🔬',
        description: 'Informasi lengkap tentang penyakit ini sedang dalam update.',
        symptoms: ['Informasi gejala belum tersedia'],
        treatment: ['Konsultasikan dengan petugas pertanian setempat']
    };
    
    // Update diagnosis tab
    document.getElementById('diagnosisResult').textContent = formatDiseaseName(diseaseName);
    document.getElementById('confidencePercent').textContent = `${confidence}%`;
    document.getElementById('meterFill').style.width = `${confidence}%`;
    document.getElementById('resultIcon').innerHTML = `<i class="fas ${getIconForDisease(diseaseName)}"></i>`;
    
    // Set confidence level message
    const confidenceLevel = document.getElementById('confidenceLevel');
    if (confidence >= 80) {
        confidenceLevel.innerHTML = '<i class="fas fa-check-circle"></i> Akurasi sangat tinggi - Hasil sangat meyakinkan';
        confidenceLevel.style.color = '#48bb78';
    } else if (confidence >= 60) {
        confidenceLevel.innerHTML = '<i class="fas fa-chart-line"></i> Akurasi cukup - Perlu verifikasi manual';
        confidenceLevel.style.color = '#f6ad55';
    } else {
        confidenceLevel.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Akurasi rendah - Silakan upload gambar yang lebih jelas';
        confidenceLevel.style.color = '#f56565';
    }
    
    // Update details tab
    document.getElementById('diseaseDescription').textContent = diseaseInfo.description;
    const symptomsList = document.getElementById('symptomsList');
    symptomsList.innerHTML = diseaseInfo.symptoms.map(symptom => `<li><i class="fas fa-leaf"></i> ${symptom}</li>`).join('');
    
    // Update probabilities tab
    const probabilitiesList = document.getElementById('probabilitiesList');
    const sortedProbabilities = Object.entries(allProbabilities).sort((a, b) => b[1] - a[1]);
    
    probabilitiesList.innerHTML = sortedProbabilities.map(([className, prob]) => {
        const probPercent = (prob * 100).toFixed(2);
        return `
            <div class="probability-item">
                <div class="probability-name">
                    <i class="fas fa-chart-simple"></i> ${formatDiseaseName(className)}
                </div>
                <div class="probability-bar">
                    <div class="probability-fill" style="width: ${probPercent}%">
                        ${probPercent}%
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Update solution tab
    const solutionSteps = document.getElementById('solutionSteps');
    solutionSteps.innerHTML = diseaseInfo.treatment.map((step, index) => `
        <div class="solution-step" style="animation-delay: ${index * 0.1}s">
            <div class="step-number">${index + 1}</div>
            <div class="step-text">${step}</div>
        </div>
    `).join('');
}

// Get icon for disease
function getIconForDisease(diseaseName) {
    const icons = {
        'Leaf smut': 'fa-leaf',
        'bacterial_leaf_blight': 'fa-tint',
        'bacterial_leaf_streak': 'fa-chart-line',
        'bacterial_panicle_blight': 'fa-chart-line',
        'blast': 'fa-fire',
        'brown_spot': 'fa-circle',
        'dead_heart': 'fa-skull',
        'downy_mildew': 'fa-cloud-rain',
        'hispa': 'fa-bug',
        'normal': 'fa-check-circle',
        'tungro': 'fa-virus'
    };
    return icons[diseaseName] || 'fa-microscope';
}

// Download report
function downloadReport() {
    const diseaseName = document.getElementById('diagnosisResult').textContent;
    const confidence = document.getElementById('confidencePercent').textContent;
    const description = document.getElementById('diseaseDescription').textContent;
    
    const report = `
========================================
        PADICARE AI - LAPORAN DETEKSI
========================================

Tanggal: ${new Date().toLocaleDateString('id-ID')}
Waktu: ${new Date().toLocaleTimeString('id-ID')}

HASIL DETEKSI:
- Penyakit: ${diseaseName}
- Tingkat Keyakinan: ${confidence}
- Status: ${confidence >= 70 ? 'Meyakinkan' : 'Perlu Verifikasi Ulang'}

DESKRIPSI:
${description}

========================================
Laporan ini dihasilkan oleh PadiCare AI
Sistem Deteksi Penyakit Daun Padi Otomatis
========================================
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `padicare_report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Laporan berhasil diunduh! 📄', 'success');
}

// Handle image upload and prediction
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showToast('Format file tidak didukung! Gunakan JPG, PNG, atau WEBP', 'error');
        return;
    }
    
    // Validate file size (max 16MB)
    if (file.size > 16 * 1024 * 1024) {
        showToast('Ukuran file terlalu besar! Maksimal 16MB', 'error');
        return;
    }
    
    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('imagePreview').src = e.target.result;
        document.getElementById('previewContainer').style.display = 'block';
        document.getElementById('uploadArea').style.display = 'none';
        
        // Predict
        predictImage(file);
    };
    reader.readAsDataURL(file);
}

// Predict image
async function predictImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    // Show loading
    document.getElementById('loadingContainer').style.display = 'block';
    document.getElementById('resultCard').style.display = 'none';
    
    // Reset loading steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    // Simulate loading steps
    await simulateLoadingSteps();
    
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.error) {
            throw new Error(result.error);
        }
        
        // Display result
        displayResult(result);
        document.getElementById('loadingContainer').style.display = 'none';
        document.getElementById('resultCard').style.display = 'block';
        
        // Scroll to result
        document.getElementById('resultCard').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        showToast('Deteksi berhasil! ✅', 'success');
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loadingContainer').style.display = 'none';
        showToast('Gagal memproses gambar. ' + (error.message || 'Gambar bukan Daun Padi'), 'error');
        resetUpload();
    }
}

// Reset upload
function resetUpload() {
    document.getElementById('imageInput').value = '';
    document.getElementById('previewContainer').style.display = 'none';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('imagePreview').src = '';
    document.getElementById('resultCard').style.display = 'none';
}

// Reset all
function resetAll() {
    resetUpload();
    document.getElementById('loadingContainer').style.display = 'none';
    showToast('Siap untuk deteksi baru! 🌾', 'info');
}

// ============================================
// ACCORDION TOGGLE FUNCTION (DROPDOWN)
// ============================================

function toggleAccordion(element) {
    const accordionCard = element.closest('.accordion-card');
    const isActive = accordionCard.classList.contains('active');
    
    // Tutup semua accordion
    document.querySelectorAll('.accordion-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Buka yang diklik jika belum aktif
    if (!isActive) {
        accordionCard.classList.add('active');
    }
}

// ============================================
// LOAD DISEASE DATA INTO GRID
// ============================================

const diseases = [
    "Leaf smut", "bacterial_leaf_blight", "bacterial_leaf_streak",
    "bacterial_panicle_blight", "blast", "brown_spot", 
    "dead_heart", "downy_mildew", "hispa", "normal", "tungro"
];

function loadDiseaseGrid() {
    const diseaseGrid = document.getElementById('diseaseGrid');
    if (!diseaseGrid) return;
    
    diseaseGrid.innerHTML = '';
    diseases.forEach(disease => {
        const diseaseItem = document.createElement('div');
        diseaseItem.className = 'disease-item';
        const displayName = formatDiseaseName(disease);
        diseaseItem.innerHTML = `
            <div class="disease-icon">
                <i class="fas fa-leaf"></i>
            </div>
            <div class="disease-name">
                ${displayName}
                <small>Penyakit Daun Padi</small>
            </div>
        `;
        diseaseGrid.appendChild(diseaseItem);
    });
}

// Initialize event listeners
function init() {
    // DOM elements
    const imageInput = document.getElementById('imageInput');
    const uploadArea = document.getElementById('uploadArea');
    const uploadBtn = document.getElementById('uploadBtn');
    const removeImageBtn = document.getElementById('removeImageBtn');
    const resetBtn = document.getElementById('resetBtn');
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    // shareBtn sudah dihapus dari HTML, jadi tidak perlu dipanggil
    
    // Event listeners
    uploadArea.addEventListener('click', () => imageInput.click());
    uploadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        imageInput.click();
    });
    imageInput.addEventListener('change', handleImageUpload);
    removeImageBtn.addEventListener('click', resetUpload);
    resetBtn.addEventListener('click', resetAll);
    downloadReportBtn.addEventListener('click', downloadReport);
    // shareBtn sudah tidak ada, tidak perlu event listener
    
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Image zoom
    const imageWrapper = document.querySelector('.image-wrapper');
    if (imageWrapper) {
        imageWrapper.addEventListener('click', () => {
            const img = document.getElementById('imagePreview');
            if (img.src) {
                window.open(img.src, '_blank');
            }
        });
    }
    
    // Create particles
    createParticles();
    
    // Load disease grid
    loadDiseaseGrid();
    
    // Check health
    checkHealth();
}

// Health check
async function checkHealth() {
    try {
        const response = await fetch('/health');
        const data = await response.json();
        if (!data.model_loaded) {
            showToast('⚠️ Model belum dimuat. Hubungi administrator!', 'error');
        } else {
            console.log('✅ Model loaded successfully');
        }
    } catch (error) {
        console.error('Health check failed:', error);
        showToast('Tidak dapat terhubung ke server! Pastikan backend berjalan di localhost:5000', 'error');
    }
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Export functions for global access
window.toggleAccordion = toggleAccordion;