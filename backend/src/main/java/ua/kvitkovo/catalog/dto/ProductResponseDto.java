package ua.kvitkovo.catalog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.catalog.entity.ProductStatus;
import ua.kvitkovo.images.dto.ImageResponseDto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Setter
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
    private int stock;

    private List<ImageResponseDto> images;

    @Schema(example = "25", description = "Product stock")
    public int getStock() {
        return stock;
    }

    @Schema(example = "1", description = "Product id")
    public Long getId() {
        return id;
    }

    @Schema(description = "Date of creation of the product")
    public Date getCreated() {
        return created;
    }

    @Schema(description = "Date of product modification")
    public Date getUpdated() {
        return updated;
    }

    @Schema(example = "Букет з гортензіями", description = "Product name")
    public String getTitle() {
        return title;
    }

    @Schema(example = "Buket-z-gortenziyami", description = "Product alias")
    public String getAlias() {
        return alias;
    }

    @Schema(example = "500.00", description = "Product base price")
    public BigDecimal getPrice() {
        return price;
    }

    @Schema(example = "450.00", description = "Product price width discount")
    public BigDecimal getPriceWithDiscount() {
        return priceWithDiscount;
    }

    @Schema(example = "10", description = "Product discount")
    public BigDecimal getDiscount() {
        return discount;
    }

    @Schema(example = "Купити букет з гортензіями", description = "Product meta description (for seo optimization)")
    public String getMetaDescription() {
        return metaDescription;
    }

    @Schema(example = "купити букет, квіти, квіти на замовлення, гортензії, букет гортензій", description = "Product meta keywords (for seo optimization)")
    public String getMetaKeywords() {
        return metaKeywords;
    }

    @Schema(example = "Простий і ніжний букет розповість про найщирішї почуття, подарує гарний настрій на весь день і позитивний настрій.", description = "Product description")
    public String getDescription() {
        return description;
    }

    @Schema(example = "true", description = "The product can be added to the bouquet designer (true or false)")
    public boolean isAllowAddToConstructor() {
        return allowAddToConstructor;
    }

    @Schema(example = "ACTIVE", description = "Product status (ACTIVE, NO_ACTIVE)")
    public ProductStatus getStatus() {
        return status;
    }

    public CategoryResponseDto getCategory() {
        return category;
    }

    public ProductTypeResponseDto getProductType() {
        return productType;
    }

    public ColorResponseDto getColor() {
        return color;
    }

    public SizeResponseDto getSize() {
        return size;
    }

    public List<ImageResponseDto> getImages() {
        return images;
    }
}
