package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {

    private Long id;
    private String title;
    private String alias;

    @Schema(example = "1", description = "Product id")
    public Long getId() {
        return id;
    }

    @Schema(example = "Букет з гортензіями", description = "Product name")
    public String getTitle() {
        return title;
    }

    @Schema(example = "Buket-z-gortenziyami", description = "Product alias")
    public String getAlias() {
        return alias;
    }
}
