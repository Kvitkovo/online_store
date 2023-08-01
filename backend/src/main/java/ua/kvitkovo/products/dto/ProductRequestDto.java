package ua.kvitkovo.products.dto;

import lombok.Builder;
import lombok.Data;
import ua.kvitkovo.products.entity.ProductStatus;

import java.math.BigDecimal;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class ProductRequestDto {

    private String title;
    private BigDecimal price;
    private BigDecimal priceWithDiscount;
    private BigDecimal discount;
    private String metaDescription;
    private String metaKeywords;
    private String description;
    private ProductStatus status;
    private long categoryId;
    private long colorId;
    private long sizeId;
}
