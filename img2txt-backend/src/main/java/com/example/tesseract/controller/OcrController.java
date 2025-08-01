package com.example.tesseract.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.tesseract.service.TesseractOCRService;

@RestController
public class OcrController {
    
    @Autowired
    private TesseractOCRService tesseractOCRService;
    
    @PostMapping("/ocr")
    public String recognizeText(@RequestParam("file") MultipartFile file) throws IOException {
        return tesseractOCRService.recognizeText(file.getInputStream());
    }
    
}