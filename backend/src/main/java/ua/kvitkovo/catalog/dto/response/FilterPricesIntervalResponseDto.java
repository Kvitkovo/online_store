package ua.kvitkovo.catalog.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.math.BigDecimal;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FilterPricesIntervalResponseDto {

    @Schema(example = "1000", description = "Minimum price product")
    private BigDecimal minPrice;

    @Schema(example = "3050", description = "Maximum price product")
    private BigDecimal maxPrice;

    @Override
    public String toString() {
        return "FilterPricesIntervalResponseDto{" +
                "minPrice=" + minPrice +
                ", maxPrice=" + maxPrice +
                '}';
    }
}
