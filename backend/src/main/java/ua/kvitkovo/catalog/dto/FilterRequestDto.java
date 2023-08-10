package ua.kvitkovo.catalog.dto;

import lombok.Builder;
import lombok.Data;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class FilterRequestDto {

    private String title;
    private String priceFrom;
    private String priceTo;
}
