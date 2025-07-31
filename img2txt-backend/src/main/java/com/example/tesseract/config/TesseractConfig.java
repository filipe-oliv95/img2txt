package com.example.tesseract.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.sourceforge.tess4j.Tesseract;

@Configuration
public class TesseractConfig {

    @Bean
    Tesseract tesseract() {
        String tessdataPrefix = System.getenv("TESSDATA_PREFIX");
        if (tessdataPrefix == null || tessdataPrefix.isBlank()) {
            tessdataPrefix = "src/main/resources/tessdata"; // local
        }

        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath(tessdataPrefix);
        tesseract.setLanguage("eng+por");
        tesseract.setTessVariable("user_defined_dpi", "96");
        return tesseract;
    }

}