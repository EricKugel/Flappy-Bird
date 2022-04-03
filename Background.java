import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import java.awt.Color;

import javax.imageio.ImageIO;

public class Background {
    public static void main(String[] arg0) {
        BufferedImage image = null;
        try {
            image = ImageIO.read(new File("lib/bird.jpg"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        BufferedImage newImage = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_ARGB);
        
        for (int x = 0; x < image.getWidth(); x++) {
            for (int y = 0; y < image.getHeight(); y++) {
                int rgb = image.getRGB(x, y);
                if (rgb != Color.WHITE.getRGB()) {
                    newImage.setRGB(x, y, rgb);
                }
            }
        }

        File outputFile = new File("lib/bird.png");

        try {
            ImageIO.write(newImage, "png", outputFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}