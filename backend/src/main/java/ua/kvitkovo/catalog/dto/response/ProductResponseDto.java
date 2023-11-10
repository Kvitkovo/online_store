package ua.kvitkovo.catalog.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import ua.kvitkovo.catalog.entity.ProductAccessibility;
import ua.kvitkovo.catalog.entity.ProductStatus;
import ua.kvitkovo.images.dto.ImageResponseDto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {

    @Schema(example = "1", description = "Product id")
    private Long id;

    @Schema(description = "Date of creation of the product")
    private Date created;

    @Schema(description = "Date of product modification")
    private Date updated;

    @Schema(example = "Букет з гортензіями", description = "Product name")
    private String title;

    @Schema(example = "Buket-z-gortenziyami", description = "Product alias")
    private String alias;

    @Schema(example = "500.00", description = "Product base price")
    private BigDecimal price;

    @Schema(example = "450.00", description = "Product price width discount")
    private BigDecimal priceWithDiscount;

    @Schema(example = "10", description = "Product discount")
    private BigDecimal discount;

    @Schema(example = "Купити букет з гортензіями", description = "Product meta description (for seo optimization)")
    private String metaDescription;

    @Schema(example = "купити букет, квіти, квіти на замовлення, гортензії, букет гортензій", description = "Product meta keywords (for seo optimization)")
    private String metaKeywords;

    @Schema(example = "Простий і ніжний букет розповість про найщирішї почуття, подарує гарний настрій на весь день і позитивний настрій.", description = "Product description")
    private String description;

    @Schema(example = "true", description = "The product can be added to the bouquet designer (true or false)")
    private boolean allowAddToConstructor;

    @Schema(example = "ACTIVE", description = "Product status (ACTIVE, NO_ACTIVE)")
    private ProductStatus status;

    @Schema(example = "1", description = "Category ID")
    private Long categoryId;

    @Schema(example = "1", description = "Product type ID")
    private Long productTypeId;

    @Schema(example = "1", description = "Color ID")
    private Long colorId;

    @Schema(example = "1", description = "Product size ID")
    private Long sizeId;

    @Schema(example = "True", description = "Product available")
    private ProductAccessibility available;

    private List<ImageResponseDto> images;


    @Override
    public String toString() {
        return "ProductResponseDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", alias='" + alias + '\'' +
                ", price=" + price +
                ", priceWithDiscount=" + priceWithDiscount +
                ", discount=" + discount +
                ", status=" + status +
                '}';
    }
}
