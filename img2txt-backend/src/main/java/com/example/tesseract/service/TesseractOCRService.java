package com.example.tesseract.service;

import com.example.tesseract.util.ImageUtils;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Service
public class TesseractOCRService {

    @Autowired
    private Tesseract tesseract;

    public String recognizeText(InputStream inputStream) throws IOException {
        BufferedImage image = ImageIO.read(inputStream);
        File tiffFile = ImageUtils.convertToTIFFWithDPI(image, 300);

        try {
            return tesseract.doOCR(tiffFile);
        } catch (TesseractException e) {
            e.printStackTrace();
            return "OCR failed: " + e.getMessage();
        } finally {
            tiffFile.delete(); // limpa arquivo temporário
        }
    }
}
