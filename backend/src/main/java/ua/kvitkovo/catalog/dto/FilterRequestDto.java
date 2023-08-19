package ua.kvitkovo.catalog.dto;

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
    private String priceFrom;
    private String priceTo;
    private Long categoryId;
    private String colors;
    private String sizes;
    private String productTypes;
    private Boolean discount;
}
