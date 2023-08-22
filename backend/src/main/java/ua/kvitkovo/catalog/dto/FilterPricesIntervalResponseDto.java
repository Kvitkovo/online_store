package ua.kvitkovo.catalog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
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
public class FilterPricesIntervalResponseDto {

    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    @Schema(example = "1000", description = "Minimum price product")
    public BigDecimal getMinPrice() {
        return minPrice;
    }

    @Schema(example = "3050", description = "Maximum price product")
    public BigDecimal getMaxPrice() {
        return maxPrice;
    }
}
