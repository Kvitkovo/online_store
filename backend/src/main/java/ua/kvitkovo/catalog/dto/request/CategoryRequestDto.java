package ua.kvitkovo.catalog.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import ua.kvitkovo.catalog.entity.CategoryIcon;
import ua.kvitkovo.catalog.entity.CategoryStatus;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDto {

    @NotBlank(message = "The 'name' cannot be empty")
    @Size(min = 1, max = 255, message
            = "Name must be between 1 and 255 characters")
    @Schema(example = "Букети", description = "Category name")
    private String name;

    @Min(value = 0, message = "parentId should not be less than 0")
    @Schema(example = "1", description = "Parent category ID")
    private long parentId;

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

    @Min(value = 0, message = "sortOrder should not be less than 0")
    @Schema(example = "120", description = "Sort order")
    private int sortValue;
}
