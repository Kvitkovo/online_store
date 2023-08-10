package ua.kvitkovo.catalog.dto;

import lombok.Builder;
import lombok.Data;
import ua.kvitkovo.catalog.entity.CategoryStatus;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class CategoryResponseDto {

    private Long id;
    private String name;
    private String alias;
    private CategoryResponseDto parent;
    private String metaDescription;
    private String metaKeywords;
    private String description;
    private CategoryStatus status;
}
