import React, { useState, useRef, useEffect } from "react";
import {
  PageWrapper,
  Title,
  UploadBox,
  UploadText,
  ImagePreview,
  RecognizeBtn,
  TextArea,
  ActionRow,
  SelectButton,
  HiddenInput,
  IconBtn,
  ErrorMessage,
  Footer,
  FooterIcons,
} from "./styles/StyledComponents";
import { FaRegCopy } from "react-icons/fa6";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function App() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [highlight, setHighlight] = useState(false);
  const dragCounter = React.useRef(0);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [animateError, setAnimateError] = useState(false);

  // Clipboard paste handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      setError(null);
      setAnimateError(false);
      setTimeout(() => setAnimateError(true), 0);
      if (e.clipboardData) {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              setImage(file);
              const url = URL.createObjectURL(file);
              setImagePreview(url);
              setText("");
              e.preventDefault();
              return;
            }
          }
        }
        setError("No image found in pasted content.");
        setAnimateError(false);
        setTimeout(() => setAnimateError(true), 0);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // Drag & drop handlers
  useEffect(() => {
    const prevent = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
    };
  }, []);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setHighlight(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      setHighlight(false);
      dragCounter.current = 0;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
    dragCounter.current = 0;
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setText("");
      setError(null);
      setAnimateError(false);
      setTimeout(() => setAnimateError(true), 0);
    } else {
      setError("Please drop an image file!");
      setAnimateError(false);
      setTimeout(() => setAnimateError(true), 0);
    }
  };

  const handleClickBox = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setText("");
        setError(null);
        setAnimateError(false);
      } else {
        setError("Please select an image file!");
        setAnimateError(false);
        setTimeout(() => setAnimateError(true), 0);
      }
    }
  };

  const sendToOCR = async () => {
    setError(null);
    setAnimateError(false);
    if (!image) return;
    setLoading(true);

    try {
      if (!image.type.startsWith("image/")) {
        throw new Error("Only image files are supported.");
      }

      const formData = new FormData();
      formData.append("file", image);

      const resp = await fetch(`${API_URL}/ocr`, {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) {
        throw new Error(`Request error: ${resp.statusText}`);
      }

      const data = await resp.text();
      setText(data);
    } catch (err: any) {
      // Detecta se é erro de rede (ex: backend offline)
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Failed to fetch.");
        setAnimateError(false);
        setTimeout(() => setAnimateError(true), 0);
      } else {
        setError(err.message || "Unknown error sending image.");
        setAnimateError(false);
        setTimeout(() => setAnimateError(true), 0);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyText = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      if (textAreaRef.current) {
        textAreaRef.current.select();
        document.execCommand("copy");
      }
    }
  };

  const reset = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImage(null);
    setImagePreview(null);
    setText("");
    setError(null);
    setAnimateError(false);
    setTimeout(() => setAnimateError(true), 0);
  };

  return (
    <PageWrapper>
      <Title>Image to Text Converter</Title>

      {!image && (
        <UploadBox
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          highlight={highlight}
          tabIndex={0}
          onClick={handleClickBox}
        >
          <UploadText>
            <strong>Drag & drop</strong> or <strong>paste (Ctrl+V)</strong> an
            image
            <br />— or —
          </UploadText>
          <SelectButton as="label">Choose Image</SelectButton>
          <HiddenInput
            id="fileInput"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSelectFile}
            onClick={(e) => {
              (e.target as HTMLInputElement).value = "";
            }}
          />
        </UploadBox>
      )}

      {imagePreview && (
        <>
          <ImagePreview src={imagePreview} alt="Image preview" />
          {text === "" && !error && (
            <RecognizeBtn onClick={sendToOCR} disabled={loading}>
              {loading ? "Processing..." : "Extract text"}
            </RecognizeBtn>
          )}
        </>
      )}

      {text && (
        <>
          <TextArea
            ref={textAreaRef}
            value={text}
            readOnly
            spellCheck={false}
          />
          <ActionRow>
            <IconBtn onClick={copyText} aria-label="Copy text">
              <FaRegCopy />
              Copy text
            </IconBtn>

            <IconBtn onClick={reset} aria-label="Reset">
              <FaArrowRotateRight />
              Reset
            </IconBtn>
          </ActionRow>
        </>
      )}

      {error && (
        <>
          <ErrorMessage animate={animateError}>{error}</ErrorMessage>
          {!error.toLowerCase().includes("an image file") && (
            <ActionRow>
              <IconBtn onClick={reset} aria-label="Reset">
                <FaArrowRotateRight />
                Reset
              </IconBtn>
            </ActionRow>
          )}
        </>
      )}

      <Footer>
        Made by Filipe Oliveira
        <FooterIcons>
          <a
            href="https://github.com/filipe-oliv95"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/filipe-oliv95"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </FooterIcons>
      </Footer>
    </PageWrapper>
  );
}

export default App;
