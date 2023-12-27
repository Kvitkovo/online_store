package ua.kvitkovo.catalog.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import ua.kvitkovo.catalog.entity.ProductStatus;

import java.math.BigDecimal;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "ProductRequest")
public class ProductRequestDto {

    @NotBlank(message = "The 'title' cannot be empty")
    @Size(min = 1, max = 250, message
            = "title must be between 1 and 250 characters")
    @Schema(example = "Букет з гортензіями", description = "Product name")
    private String title;

    @Min(value = 0, message = "The value must be positive")
    @Schema(example = "500.00", description = "Product base price")
    private BigDecimal price;

    @Min(value = 0, message = "The value must be positive")
    @Schema(example = "450.00", description = "Product price width discount")
    private BigDecimal priceWithDiscount;

    @Min(value = 0, message = "The value must be positive")
    @Schema(example = "10", description = "Product discount")
    private BigDecimal discount;

    @Schema(example = "Купити букет з гортензіями", description = "Product meta description (for seo optimization)")
    private String metaDescription;

    @Schema(example = "купити букет, квіти, квіти на замовлення, гортензії, букет гортензій", description = "Product meta keywords (for seo optimization)")
    private String metaKeywords;

    @Schema(example = "Простий і ніжний букет розповість про найщирішї почуття, подарує гарний настрій на весь день і позитивний настрій.", description = "Product description")
    private String description;

    @Schema(example = "ACTIVE", description = "Product status (ACTIVE, NO_ACTIVE)")
    private ProductStatus status;

    @NotNull
    @Schema(example = "1", description = "Product category ID")
    private Long categoryId;

    @Schema(example = "7", description = "Product type ID")
    private Long productTypeId;

    @Schema(example = "2", description = "Product color ID")
    private Long colorId;

    @NotNull
    @Schema(example = "1", description = "Product size ID")
    private Long sizeId;

    @Schema(example = "true", description = "The product can be added to the bouquet designer (true or false)")
    private boolean allowAddToConstructor;

    @Schema(example = "25", description = "Product stock")
    private int stock;
}
