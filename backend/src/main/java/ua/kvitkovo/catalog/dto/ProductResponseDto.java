package ua.kvitkovo.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.kvitkovo.catalog.entity.ProductStatus;
import ua.kvitkovo.images.dto.ImageResponseDto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {

    private Long id;
    private Date created;
    private Date updated;
    private String title;
    private String alias;
    private BigDecimal price;
    private BigDecimal priceWithDiscount;
    private BigDecimal discount;
    private String metaDescription;
    private String metaKeywords;
    private String description;
    private boolean allowAddToConstructor;
    private ProductStatus status;
    private CategoryResponseDto category;
    private ProductTypeResponseDto productType;
    private ColorResponseDto color;
    private SizeResponseDto size;
    private List<ImageResponseDto> images;
}
