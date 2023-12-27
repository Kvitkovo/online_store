package ua.kvitkovo.images.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@Schema(name = "ImageRequest")
public class ImageRequestDto {

    @NotBlank
    private long productId;
    @NotBlank
    private MultipartFile file;
}
