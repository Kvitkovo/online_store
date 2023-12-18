package ua.kvitkovo.images.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "Image")
public class ImageResponseDto {

    @NotBlank
    @Schema(example = "10", description = "")
    private Long id;

    @NotBlank
    @Schema(example = "1", description = "ID product")
    private long productId;

    @NotBlank
    @Schema(example = "Каланхое image", description = "alt-tag image")
    private String name;

    @Schema(example = "true", description = "The main image of the product")
    private boolean mainImage;

    @Schema(example = "https://kvitkovo.s3.eu-north-1.amazonaws.com/images/products/1_HUpQe_b.webp",
            description = "Link to a large product image"
    )
    @NotBlank
    private String url;

    @Schema(example = "https://kvitkovo.s3.eu-north-1.amazonaws.com/images/products/1_lHyUK_s.webp",
            description = "Link to a small product image"
    )
    @NotBlank
    private String urlSmall;
}
