package com.example.tesseract.util;

import javax.imageio.*;
import javax.imageio.metadata.IIOMetadata;
import javax.imageio.stream.ImageOutputStream;
import javax.imageio.metadata.IIOMetadataNode;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;

public class ImageUtils {

    public static File convertToTIFFWithDPI(BufferedImage image, int dpi) throws IOException {
        File tiffFile = File.createTempFile("ocr_input_", ".tiff");

        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("tiff");
        if (!writers.hasNext()) {
            throw new IllegalStateException("No TIFF writers found. Make sure TwelveMonkeys ImageIO is on the classpath.");
        }

        ImageWriter writer = writers.next();
        try (ImageOutputStream ios = ImageIO.createImageOutputStream(tiffFile)) {
            writer.setOutput(ios);

            ImageWriteParam writeParam = writer.getDefaultWriteParam();
            ImageTypeSpecifier typeSpecifier = ImageTypeSpecifier.createFromBufferedImageType(image.getType());
            IIOMetadata metadata = writer.getDefaultImageMetadata(typeSpecifier, writeParam);

            if (metadata.isStandardMetadataFormatSupported()) {
                IIOMetadataNode root = new IIOMetadataNode("javax_imageio_1.0");

                IIOMetadataNode dimension = new IIOMetadataNode("Dimension");

                IIOMetadataNode hRes = new IIOMetadataNode("HorizontalPixelSize");
                hRes.setAttribute("value", String.valueOf(25.4 / dpi));

                IIOMetadataNode vRes = new IIOMetadataNode("VerticalPixelSize");
                vRes.setAttribute("value", String.valueOf(25.4 / dpi));

                dimension.appendChild(hRes);
                dimension.appendChild(vRes);
                root.appendChild(dimension);

                metadata.mergeTree("javax_imageio_1.0", root);
            }

            writer.write(null, new IIOImage(image, null, metadata), writeParam);
        } finally {
            writer.dispose();
        }

        return tiffFile;
    }
}
