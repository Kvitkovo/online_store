package ua.kvitkovo.catalog.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "FilterRequest")
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
