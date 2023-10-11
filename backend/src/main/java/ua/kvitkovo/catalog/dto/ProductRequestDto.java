package ua.kvitkovo.catalog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.catalog.entity.ProductStatus;

import java.math.BigDecimal;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDto {

    @NotBlank
    @Size(min = 1, max = 250, message
            = "title must be between 1 and 250 characters")
    private String title;
    @Min(value = 0, message = "The value must be positive")
    private BigDecimal price;
    @Min(value = 0, message = "The value must be positive")
    private BigDecimal priceWithDiscount;
    @Min(value = 0, message = "The value must be positive")
    private BigDecimal discount;
    private String metaDescription;
    private String metaKeywords;
    private String description;
    private ProductStatus status;
    @NotNull
    private Long categoryId;
    private Long productTypeId;
    private Long colorId;
    @NotNull
    private Long sizeId;
    private boolean allowAddToConstructor;
    private int stock;

    @Schema(example = "25", description = "Product stock")
    public int getStock() {
        return stock;
    }

    @Schema(example = "Букет з гортензіями", description = "Product name")
    public String getTitle() {
        return title;
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

    @Schema(example = "ACTIVE", description = "Product status (ACTIVE, NO_ACTIVE)")
    public ProductStatus getStatus() {
        return status;
    }

    @Schema(example = "1", description = "Product category ID")
    public Long getCategoryId() {
        return categoryId;
    }

    @Schema(example = "7", description = "Product type ID")
    public Long getProductTypeId() {
        return productTypeId;
    }

    @Schema(example = "2", description = "Product color ID")
    public Long getColorId() {
        return colorId;
    }

    @Schema(example = "1", description = "Product size ID")
    public Long getSizeId() {
        return sizeId;
    }

    @Schema(example = "true", description = "The product can be added to the bouquet designer (true or false)")
    public boolean isAllowAddToConstructor() {
        return allowAddToConstructor;
    }
}
