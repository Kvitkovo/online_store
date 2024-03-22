package ua.kvitkovo.utils;

import com.itextpdf.text.pdf.BaseFont;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.file.FileSystems;

public class PdfGenerator {

    public static InputStreamResource generatePdfFromThymeleaf(String html) throws Exception {
        String fontPath = "fonts/arial.ttf";

        ITextRenderer renderer = new ITextRenderer();
        renderer.getFontResolver().addFont(fontPath, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        String baseUrl = FileSystems
                .getDefault()
                .getPath("src", "test", "resources")
                .toUri()
                .toURL()
                .toString();

        String xHtml = htmlToXhtml(html);
        renderer.setDocumentFromString(xHtml, baseUrl);
        renderer.setScaleToFit(true);
        renderer.layout();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        renderer.createPDF(outputStream);

        ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());
        return new InputStreamResource(inputStream);
    }

    private static String htmlToXhtml(final String html) {
        final Document document = Jsoup.parse(html);
        document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
        return document.html();
    }
}
