package ua.kvitkovo.catalog.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.catalog.entity.CategoryIcon;
import ua.kvitkovo.catalog.entity.CategoryStatus;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponseDto {

    private Long id;
    private String name;
    private String alias;
    private CategoryResponseDto parent;
    private String metaDescription;
    private String metaKeywords;
    private String description;
    private CategoryStatus status;
    private CategoryIcon icon;
    private boolean hasSubCategory;

    @Schema(example = "SALE", description = "Category icon")
    public CategoryIcon getIcon() {
        return icon;
    }

    @Schema(example = "1", description = "ID category")
    public Long getId() {
        return id;
    }

    @Schema(example = "Букети", description = "Category name")
    public String getName() {
        return name;
    }

    @Schema(example = "Buketi", description = "Category alias")
    public String getAlias() {
        return alias;
    }

    @Schema(example = "Buketi", description = "Parent category or null")
    public CategoryResponseDto getParent() {
        return parent;
    }

    @Schema(example = "Купити букети в Києві", description = "Category meta description (for seo optimization)")
    public String getMetaDescription() {
        return metaDescription;
    }

    @Schema(example = "купити букет, квіти, квіти на замовлення", description = "Category meta keywords (for seo optimization)")
    public String getMetaKeywords() {
        return metaKeywords;
    }

    @Schema(example = "ВЕСІЛЬНІ БУКЕТИ, БУКЕТИ ДЛЯ НАРЕЧЕНОЇ, БУТОНЬЄРКИ, БУКЕТИ ДЛЯ ГОСТЕЙ НА ВЕСІЛЛЯ - У КИЄВІ.", description = "Category description")
    public String getDescription() {
        return description;
    }

    @Schema(example = "ACTIVE", description = "Category status (ACTIVE, NO_ACTIVE)")
    public CategoryStatus getStatus() {
        return status;
    }

    public boolean isHasSubCategory() {
        return hasSubCategory;
    }
}
