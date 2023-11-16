package ua.kvitkovo.feedback.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.kvitkovo.aws.AwsService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j
@RequiredArgsConstructor
@Service
public class FeedBackMessageFileService {

    private final AwsService awsService;

    @Value("${aws.s3.catalog.messages}")
    private String catalogName;

    public String sendFile(MultipartFile multipartFile, String newFileName) {
        try {
            Path tempFile = Files.createTempFile("", "");
            File file = new File(tempFile.toUri());
            multipartFile.transferTo(file);
            String fileUrl = awsService.sendFile(file, catalogName, newFileName);
            file.delete();
            return fileUrl;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteFile(String fileUrl) {
        awsService.deleteFile(catalogName, awsService.getFileNameAws(fileUrl));
    }
}
