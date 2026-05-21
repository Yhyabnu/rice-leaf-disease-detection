# 🌾 Rice Leaf Disease Detection Using CNN

Implementation of *Deep Learning* for rice leaf disease detection using the *Convolutional Neural Network (CNN)* algorithm. This project aims to classify rice leaf diseases based on digital images to help early disease detection in agriculture.

## 📌 Overview

Rice productivity is often affected by various leaf diseases that can reduce crop yields and even cause crop failure. Manual disease identification is still widely used and highly depends on farmers’ experience. Therefore, this project implements a *Convolutional Neural Network (CNN)* model to automatically detect and classify rice leaf diseases from image data.

This research was developed as a final thesis project in the Informatics Study Program, Faculty of Science and Technology, Universitas Nurul Huda.

---

## 🎯 Objectives

* Detect rice leaf diseases automatically using image classification.
* Implement a *Deep Learning* approach with CNN architecture.
* Evaluate model performance using classification metrics.
* Improve classification accuracy through *hyperparameter tuning*.

---

## 📂 Dataset

The dataset used in this project was obtained from Kaggle and contains:

* 📸 Total Images: **10,407**
* 🦠 Total Classes: **11 Rice Leaf Disease Classes**

### Disease Classes

* Bacterial Blight
* Blast
* Brown Spot
* Dead Heart
* Downy Mildew
* Healthy
* Hispa
* Leaf Smut
* Tungro
* White Stem Borer
* Others

---

## ⚙️ Methodology

This project follows the **CRISP-DM** methodology:

1. Business Understanding
2. Data Understanding
3. Data Preparation
4. Modeling
5. Evaluation

### Preprocessing Steps

* Image resizing (224×224)
* Normalization
* Data augmentation
* Handling class imbalance using undersampling

---

## 🧠 CNN Architecture

The CNN model consists of:

* 4 Convolutional Blocks
* Filter sizes:

  * 32
  * 64
  * 128
  * 256
* MaxPooling Layer
* Dropout Layer
* Fully Connected Dense Layer
* Softmax Output Layer

### Hyperparameter Tuning

The best model configuration:

* Optimizer: Adam
* Learning Rate: 0.0001
* Epochs: 100
* Batch Size: 32

---

## 📊 Model Performance

| Metric              | Result |
| ------------------- | ------ |
| Validation Accuracy | 90.57% |
| Precision           | 0.91   |
| Recall              | 0.90   |
| F1-Score            | 0.89   |
| Loss                | 0.7899 |

### Best Performing Class

* ✅ Leaf Smut → 100% Accuracy

### Most Challenging Class

* ⚠️ Downy Mildew
  Misclassified due to visual similarity with:

  * Tungro
  * Brown Spot

---

## 🛠️ Technologies Used

* Python
* TensorFlow / Keras
* NumPy
* Pandas
* Matplotlib
* Scikit-learn
* OpenCV
* Google Colab / Jupyter Notebook

---

## 🚀 Installation

Clone this repository:

```bash
git clone https://github.com/Yhyabnu/rice-leaf-disease-detection.git
```

Move into the project directory:

```bash
cd rice-leaf-disease-detection
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the notebook or training script.

---

## 📁 Project Structure

```bash
rice-leaf-disease-detection/
│
├── dataset/
├── models/
├── notebooks/
├── results/
├── images/
├── requirements.txt
├── README.md
└── train.py
```

---

## 📈 Evaluation

Model evaluation was performed using:

* Confusion Matrix
* Accuracy
* Precision
* Recall
* F1-Score

The confusion matrix analysis showed that some disease classes have very similar visual characteristics, which affects prediction accuracy.

---

## 🔮 Future Improvements

Future research can improve this project by:

* Using larger and more diverse datasets
* Implementing transfer learning models such as:

  * ResNet
  * EfficientNet
  * MobileNet
* Deploying the model into a mobile or web application
* Applying real-time disease detection

---

## 👨‍💻 Author

**Yahya Ibnu Fajar**
Informatics Study Program
Faculty of Science and Technology
Universitas Nurul Huda

GitHub: [Yhyabnu GitHub](https://github.com/Yhyabnu?utm_source=chatgpt.com)

---

## 📚 References

* Kaggle Rice Leaf Disease Dataset
* TensorFlow Documentation
* CNN-based Plant Disease Classification Research Papers

---

## ⭐ Support

If you find this project useful, feel free to give this repository a ⭐ on GitHub.
