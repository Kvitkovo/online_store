package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "OrderProduct")
public class ProductResponseDto {

    @Schema(example = "1", description = "Product id")
    private Long id;

    @Schema(example = "Букет з гортензіями", description = "Product name")
    private String title;

    @Schema(example = "Buket-z-gortenziyami", description = "Product alias")
    private String alias;

    @Schema(example = "https://kvitkovo.s3.eu-north-1.amazonaws.com/images/products/1_lHyUK_s.webp",
            description = "Link to a small product image"
    )
    @NotBlank
    private String mainImageSmallUrl;
}
