package ua.kvitkovo.images.converter;

import com.luciad.imageio.webp.WebPWriteParam;
import org.springframework.stereotype.Service;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
public class WebpHandler {

    public File convertJpgToWebp(File file) {
        BufferedImage image;
        File tmpFile = null;
        try {
            image = ImageIO.read(file);
            ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/webp").next();

            WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
            writeParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            writeParam.setCompressionType(writeParam.getCompressionTypes()[WebPWriteParam.LOSSY_COMPRESSION]);
            writeParam.setCompressionQuality(0.8f);

            tmpFile = File.createTempFile("data", null);
            writer.setOutput(new FileImageOutputStream(tmpFile));
            writer.write(null, new IIOImage(image, null, null), writeParam);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return tmpFile;
    }
}
