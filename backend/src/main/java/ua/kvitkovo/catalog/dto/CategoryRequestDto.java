package ua.kvitkovo.catalog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;
import ua.kvitkovo.catalog.entity.CategoryStatus;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
public class CategoryRequestDto {

    @NotBlank
    private String name;
    private long parentId;
    private String metaDescription;
    private String metaKeywords;
    private String description;
    private CategoryStatus status;

    @Schema(example = "Букети", description = "Category name")
    public String getName() {
        return name;
    }

    @Schema(example = "1", description = "Parent category ID")
    public long getParentId() {
        return parentId;
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
}
