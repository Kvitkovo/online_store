package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {

    @Schema(example = "1", description = "Product id")
    private Long id;

    @Schema(example = "Букет з гортензіями", description = "Product name")
    private String title;

    @Schema(example = "Buket-z-gortenziyami", description = "Product alias")
    private String alias;
}
