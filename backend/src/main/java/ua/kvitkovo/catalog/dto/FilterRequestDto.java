package ua.kvitkovo.catalog.dto;

import jakarta.validation.constraints.Min;
import java.util.List;
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
public class FilterRequestDto {

    private String title;
    private Integer priceFrom;
    private Integer priceTo;
    private Long categoryId;
    private List<Long> colors;
    private List<Long> sizes;
    private List<Long> productTypes;
    private Boolean discount;
}
