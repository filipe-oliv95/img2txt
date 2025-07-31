# Image to Text – OCR with Spring Boot + Tesseract + React

<div align="center">
  <img src="/assets/usage.gif" alt="Project Demo" width="800"/>
  <p><em>Figure 1: Project Demonstration</em></p>
</div>

## 📌 Introduction
This project allows you to convert images into text using a simple web interface built with React, Vite, and TypeScript, and a backend powered by Spring Boot, Java and Tesseract OCR.

My motivation for this project is that I use OCR tools frequently in my daily workflow. Most online tools are limited or require paid plans for extended use. This project solves that by offering a fast, open, and local alternative.

It aims to convert images into text simply and quickly, with no restrictions, and is designed for developers, students, and anyone frustrated with the limitations of online OCR tools.

## 🚀 Live Demo
The project is deployed and available for testing:

- **Frontend (Vercel):** [https://img2txt-frontend.vercel.app/](https://img2txt-frontend.vercel.app/)
- **Backend (Railway):** Connected and running in production environment.

Try uploading an image and see the OCR results in action!

## ⚙️ Requirements
- Docker (for full setup)
- Alternatively:
  - Node.js >= 18.0.0 e npm >= 9.0.0
  - Java 21 + Maven 3.9

## 🧰 Tech Stack
- Frontend: React + Vite + TypeScript + Styled Components
- Backend: Spring Boot + Java 21 + Tesseract OCR + imageio-tiff
- Containerization: Docker + Docker Compose

## 🐳 Installation & Usage
```bash
git clone https://github.com/filipe-oliv95/img2txt.git
cd img2txt
docker-compose up --build
```
Access the application at: `http://localhost:3000`

> Make sure Docker is installed and running.

## 🔍 Structure Overview
- **Frontend:** Upload images, receive OCR results, styled clean UI
- **Backend:** Processes image using Tesseract, exposes `/ocr` endpoint

<div align="center">
  <img src="/assets/system_design.JPG" alt="System Design" width="800"/>
  <p><em>Figure 2: Solution Architecture</em></p>
</div>

## 📈 Possible Improvements
- Enhance image preprocessing for better OCR accuracy
- Add support for PDF to text conversion
- Save upload history or allow download of results

## ✅ Conclusion
This project is a practical and functional OCR solution using open-source technologies and containerization.

## 🪪 License
This project is licensed under the [MIT License](./LICENSE).

## 👨‍💻 Made by Filipe Oliveira
Feel free to use, contribute, or improve!

- [LinkedIn](https://www.linkedin.com/in/filipe-oliv95/)
- [GitHub](https://github.com/filipe-oliv95/)
