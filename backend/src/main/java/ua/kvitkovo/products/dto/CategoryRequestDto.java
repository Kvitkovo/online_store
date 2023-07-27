package ua.kvitkovo.products.dto;

import lombok.Builder;
import lombok.Data;
import ua.kvitkovo.products.entity.CategoryStatus;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class CategoryRequestDto {

    private String name;
    private long parentId;
    private String metaDescription;
    private String metaKeywords;
    private String description;
    private CategoryStatus status;
}
