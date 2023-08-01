package ua.kvitkovo.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.URL;

/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Service
public class AwsService {

    private final AmazonS3 s3client;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public String sendFile(File file, String awsCatalog, String fileName) {
        s3client.putObject(
                bucketName,
                awsCatalog + fileName,
                file
        );
        URL url = s3client.getUrl(bucketName, awsCatalog + fileName);
        return url.toString();
    }

    public byte[] getFile(String awsCatalog, String fileName) {
        S3Object s3object = s3client.getObject(bucketName, awsCatalog + fileName);
        S3ObjectInputStream inputStream = s3object.getObjectContent();
        try {
            return inputStream.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteFile(String awsCatalog, String fileName) {
        s3client.deleteObject(bucketName, awsCatalog + fileName);
    }
}
