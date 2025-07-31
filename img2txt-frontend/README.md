# Image to Text – Frontend (React + Vite + TypeScript)

<img src="/assets/usage.gif" alt="Frontend Preview" width="800"/>

## 🎯 Introduction
This is the frontend of the **Image to Text** project, providing a simple user interface for uploading images and viewing the extracted text.

## 🚀 Features
- Upload image interface
- Displays OCR-extracted text
- Clean and responsive UI

## 🧑‍💻 Target Audience
Anyone looking for a simple and fast OCR tool without limitations.

## 🧰 Tech Stack
- React + Vite + TypeScript
- Styled Components

## ⚙️ Requirements
- Docker (for full setup)
- Alternatively:
    - Node.js >= 18.0.0 
    - npm >= 9.0.0

## 🔧 Installation & Usage

### 🖥️ Run without Docker
```bash
git clone https://github.com/filipe-oliv95/img2txt-frontend.git
cd img2txt-frontend
npm install
npm run dev
```
App will be available at: `http://localhost:5173`

> Ensure the backend is running at `http://localhost:8080` or set `VITE_API_URL` in the environment.

### 🐳 Run with Docker (recommended)
```bash
docker build . -t img2txt-frontend:v1.0
docker run --rm --name img2txt -p 3000:3000 img2txt-frontend:v1.0
```

## 🔁 Environment
- No .env file required
- API URL fallback: `http://localhost:8080`

## 👨‍💻 Made by Filipe Oliveira
- [LinkedIn](https://www.linkedin.com/in/filipe-oliv95/)
- [GitHub](https://github.com/filipe-oliv95/)
