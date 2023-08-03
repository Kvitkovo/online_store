package ua.kvitkovo.products.dto;

import lombok.Builder;
import lombok.Data;
import ua.kvitkovo.products.entity.ProductStatus;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
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
    private ProductStatus status;
    private CategoryResponseDto category;
    private ColorResponseDto color;
    private SizeResponseDto size;
}
