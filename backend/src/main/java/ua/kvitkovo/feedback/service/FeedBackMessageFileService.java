package ua.kvitkovo.feedback.service;

import java.io.File;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.kvitkovo.aws.AwsService;

@Slf4j
@RequiredArgsConstructor
@Service
public class FeedBackMessageFileService {

    private final AwsService awsService;

    @Value("${aws.s3.catalog.messages}")
    private String catalogName;

    public String sendFile(MultipartFile multipartFile) {
        File file = new File(multipartFile.getOriginalFilename());
        try {
            multipartFile.transferTo(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return awsService.sendFile(file, catalogName, multipartFile.getOriginalFilename());
    }

    public void deleteFile(String fileUrl) {
        awsService.deleteFile(catalogName, awsService.getFileNameAws(fileUrl));
    }
}
