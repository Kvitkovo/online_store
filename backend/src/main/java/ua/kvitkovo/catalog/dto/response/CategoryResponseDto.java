package ua.kvitkovo.catalog.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import ua.kvitkovo.catalog.entity.CategoryIcon;
import ua.kvitkovo.catalog.entity.CategoryStatus;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "Category")
public class CategoryResponseDto {

    @Schema(example = "1", description = "ID category")
    private Long id;

    @Schema(example = "Букети", description = "Category name")
    private String name;

    @Schema(example = "Buketi", description = "Category alias")
    private String alias;

    @Schema(example = "Buketi", description = "Parent category or null")
    private CategoryResponseDto parent;

    @Schema(example = "Купити букети в Києві", description = "Category meta description (for seo optimization)")
    private String metaDescription;

    @Schema(example = "купити букет, квіти, квіти на замовлення", description = "Category meta keywords (for seo optimization)")
    private String metaKeywords;

    @Schema(example = "ВЕСІЛЬНІ БУКЕТИ, БУКЕТИ ДЛЯ НАРЕЧЕНОЇ, БУТОНЬЄРКИ, БУКЕТИ ДЛЯ ГОСТЕЙ НА ВЕСІЛЛЯ - У КИЄВІ.", description = "Category description")
    private String description;

    @Schema(example = "ACTIVE", description = "Category status (ACTIVE, NO_ACTIVE)")
    private CategoryStatus status;

    @Schema(example = "SALE", description = "Category icon")
    private CategoryIcon icon;

    @Schema(example = "True", description = "A category has children")
    private boolean hasSubCategory;

    @Schema(example = "120", description = "Sort order")
    private int sortValue;

    @Override
    public String toString() {
        return "CategoryResponseDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", alias='" + alias + '\'' +
                '}';
    }
}
