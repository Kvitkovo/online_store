package ua.kvitkovo.images.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageResponseDto {

    @NotBlank
    private Long id;
    @NotBlank
    private long productId;
    @NotBlank
    private String name;
    private boolean mainImage;
    @NotBlank
    private String url;
    @NotBlank
    private String urlSmall;

    @Schema(example = "10", description = "")
    public Long getId() {
        return id;
    }

    @Schema(example = "1", description = "ID product")
    public long getProductId() {
        return productId;
    }

    @Schema(example = "Каланхое image", description = "alt-tag image")
    public String getName() {
        return name;
    }

    @Schema(example = "true",
            description = "The main image of the product"
    )
    public boolean isMainImage() {
        return mainImage;
    }

    @Schema(example = "https://kvitkovo.s3.eu-north-1.amazonaws.com/images/products/1_HUpQe_b.webp",
            description = "Link to a large product image"
    )
    public String getUrl() {
        return url;
    }

    @Schema(example = "https://kvitkovo.s3.eu-north-1.amazonaws.com/images/products/1_lHyUK_s.webp",
            description = "Link to a small product image"
    )
    public String getUrlSmall() {
        return urlSmall;
    }
}
