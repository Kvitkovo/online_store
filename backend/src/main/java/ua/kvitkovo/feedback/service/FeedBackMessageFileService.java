package ua.kvitkovo.feedback.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ua.kvitkovo.aws.AwsService;

@Slf4j
@RequiredArgsConstructor
@Service
public class FeedBackMessageFileService {

    private final AwsService awsService;

    @Value("${aws.s3.catalog.messages}")
    private String catalogName;

    public void deleteFile(String fileUrl) {
        awsService.deleteFile(catalogName, awsService.getFileNameAws(fileUrl));
    }
}
