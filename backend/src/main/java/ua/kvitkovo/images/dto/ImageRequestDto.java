package ua.kvitkovo.images.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class ImageRequestDto {

    @NotBlank
    private long productId;
    @NotBlank
    private MultipartFile file;
}
