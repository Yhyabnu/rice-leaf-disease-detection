# 🌾 PadiCare AI — Deteksi Penyakit Daun Padi

[![GitHub stars](https://img.shields.io/github/stars/Yhyabnu/rice-leaf-disease-detection)](https://github.com/Yhyabnu/rice-leaf-disease-detection/stargazers)
[![GitHub license](https://img.shields.io/github/license/Yhyabnu/rice-leaf-disease-detection)](https://github.com/Yhyabnu/rice-leaf-disease-detection/blob/main/LICENSE)

Sistem deteksi penyakit pada daun padi berbasis **Deep Learning CNN** dengan validasi dan rekomendasi cerdas dari **Google Gemini AI**. Dibangun untuk membantu petani mengidentifikasi 11 jenis penyakit daun padi secara cepat dan akurat.

> ⚠️ **Catatan Repository**: Karena batasan ukuran file GitHub, model CNN (`model.h5`) dan dataset tidak disertakan dalam repository ini. Silakan lihat bagian **Unduh Model & Dataset** di bawah.

---

## ✨ Fitur Utama

| Fitur | Teknologi |
|-------|------------|
| 🔍 **Validasi Gambar** | Google Gemini AI (memastikan gambar adalah daun padi) |
| 🧠 **Deteksi Penyakit** | Custom CNN (11 kelas penyakit) |
| 💊 **Rekomendasi Cerdas** | Gemini AI (pengendalian kimia, organik, pencegahan) |
| 📱 **Antarmuka Web** | HTML, CSS, JavaScript (Responsif & Modern) |
| 📄 **Unduh Laporan** | Hasil deteksi + rekomendasi dalam format teks |

---

## 🦠 11 Kelas Penyakit yang Terdeteksi

| No | Penyakit | Kode |
|----|----------|------|
| 1 | Leaf Smut | `Leaf_smut` |
| 2 | Bacterial Leaf Blight | `bacterial_leaf_blight` |
| 3 | Bacterial Leaf Streak | `bacterial_leaf_streak` |
| 4 | Bacterial Panicle Blight | `bacterial_panicle_blight` |
| 5 | Blast | `blast` |
| 6 | Brown Spot | `brown_spot` |
| 7 | Dead Heart | `dead_heart` |
| 8 | Downy Mildew | `downy_mildew` |
| 9 | Hispa | `hispa` |
| 10 | Normal (Sehat) | `normal` |
| 11 | Tungro | `tungro` |

---

## 🏗️ Arsitektur Sistem
