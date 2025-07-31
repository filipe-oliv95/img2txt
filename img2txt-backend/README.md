# Image to Text – Backend (Spring Boot + Tesseract)

## 🎯 Introduction

This is the backend service for the **Image to Text** project. It processes images using Tesseract OCR and returns extracted text.

The full project, including frontend and backend setup with Docker Compose, can be found at: [https://github.com/filipe-oliv95/img2txt](https://github.com/filipe-oliv95/img2txt)


## 🚀 Features
- Processes images via HTTP request
- Uses Tesseract OCR
- Fast and accurate response

## 🧑‍💻 Target Audience
Anyone needing image-to-text processing via a simple REST API.

## 🧰 Tech Stack
- Java 21
- Spring Boot + Maven 3.9
- Tesseract OCR + imageio-tiff

## ⚙️ Requirements
- **Docker** (recommended)

If you prefer to run the application without Docker, make sure the following are installed and properly configured on your machine:

- Java 21
- Maven 3.9+

## 🔧 Installation & Usage

### 🐳 Run with Docker (recommended)
```bash
docker build . -t img2txt-backend:v1.0
docker run --rm --name img2txt -p 8080:8080 img2txt-backend:v1.0
```

> Tesseract is installed via Dockerfile

### 📡 OCR Endpoint
```http
POST /ocr
```
**Body:** Multipart image file  
**Response:** Extracted text

```java
@PostMapping("/ocr")
public String recognizeText(@RequestParam("file") MultipartFile file) throws IOException {
    return tesseractOCRService.recognizeText(file.getInputStream());
}
```

## 🧪 Testing with Postman

You can test the `http://localhost:8080/ocr` endpoint using Postman by sending a `POST` request with a form-data body containing the image file under the key `file`.

🖼️ Original Image:

<img src="/assets/test_ocr.JPG" alt="Original Image" width="300"/>

📥 Response in Postman:

<img src="/assets/postman_image.png" alt="Postman Response" width="600"/>


## 🌐 CORS
Allowed origins: `http://localhost:5173`, `http://localhost:3000`

## 👨‍💻 Made by Filipe Oliveira
- [LinkedIn](https://www.linkedin.com/in/filipe-oliv95/)
- [GitHub](https://github.com/filipe-oliv95/)
