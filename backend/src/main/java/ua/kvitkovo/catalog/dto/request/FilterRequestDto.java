package ua.kvitkovo.catalog.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
