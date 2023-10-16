package ua.kvitkovo.catalog.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDto {

    @NotBlank(message = "The 'name' cannot be empty")
    @Size(min = 1, max = 255, message
            = "Name must be between 1 and 255 characters")
    private String name;
    @Min(value = 0, message = "parentId should not be less than 0")
    private long parentId;
    private String metaDescription;
    private String metaKeywords;
    private String description;
    private CategoryStatus status;
    private CategoryIcon icon;

    @Schema(example = "SALE", description = "Category icon")
    public CategoryIcon getIcon() {
        return icon;
    }

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
