package ua.kvitkovo.images.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class ImageRequestDto {

    private long productId;
    private MultipartFile file;
}
