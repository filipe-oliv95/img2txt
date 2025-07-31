package com.example.tesseract.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")                 // Permite CORS para todos os endpoints
            .allowedOrigins("http://localhost:5173", "http://localhost:3000", "https://img2txt-frontend.vercel.app")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
            .allowedHeaders("Content-Type", "Authorization", "X-Requested-With")                   // Permite qualquer cabeçalho
            .allowCredentials(true)                 // Permite envio de cookies e credenciais
            .maxAge(3600);                         // Cache da prévia CORS por 1 hora
    }
}