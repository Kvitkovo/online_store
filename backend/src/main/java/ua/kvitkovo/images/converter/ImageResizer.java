package ua.kvitkovo.images.converter;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;

/**
 * @author Andriy Gaponov
 */
@Service
public class ImageResizer {

    public void resize(InputStream input, Path target,
                       int width, int height) throws IOException {

        BufferedImage originalImage = ImageIO.read(input);
        Image newResizedImage = originalImage
                .getScaledInstance(width, height, Image.SCALE_SMOOTH);

        String s = target.getFileName().toString();
        String fileExtension = s.substring(s.lastIndexOf(".") + 1);

        ImageIO.write(convertToBufferedImage(newResizedImage), fileExtension, target.toFile());
    }

    public static BufferedImage convertToBufferedImage(Image img) {

        if (img instanceof BufferedImage) {
            return (BufferedImage) img;
        }

        BufferedImage bi = new BufferedImage(
                img.getWidth(null), img.getHeight(null),
                BufferedImage.TYPE_INT_RGB);

        Graphics2D graphics2D = bi.createGraphics();
        graphics2D.drawImage(img, 0, 0, null);
        graphics2D.dispose();

        return bi;
    }
}
