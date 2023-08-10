package ua.kvitkovo.catalog.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.dto.CategoryRequestDto;
import ua.kvitkovo.catalog.dto.CategoryResponseDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.service.CategoryService;

/**
 * @author Andriy Gaponov
 */
@Service
@AllArgsConstructor
public class CategoryConverter {

    public CategoryResponseDto convertToDto(final Category entity) {
        if (entity == null) {
            return null;
        }
        return CategoryResponseDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .alias(entity.getAlias())
                .parent(convertToDto(entity.getParent()))
                .metaDescription(entity.getMetaDescription())
                .metaKeywords(entity.getMetaKeywords())
                .description(entity.getDescription())
                .status(entity.getStatus())
                .build();
    }

    public Category convertToEntity(CategoryResponseDto dto) {
        if (dto == null) {
            return null;
        }
        return Category.builder()
                .id(dto.getId())
                .name(dto.getName())
                .alias(dto.getAlias())
                .parent(convertToEntity(dto.getParent()))
                .metaDescription(dto.getMetaDescription())
                .metaKeywords(dto.getMetaKeywords())
                .description(dto.getDescription())
                .status(dto.getStatus())
                .build();
    }

    public Category convertToEntity(CategoryRequestDto dto, CategoryService categoryService) {
        if (dto == null) {
            return null;
        }

        CategoryResponseDto categoryResponseDto = null;
        if (dto.getParentId() > 0) {
            categoryResponseDto = categoryService.findById(dto.getParentId());
        }

        return Category.builder()
                .name(dto.getName())
                .parent(convertToEntity(categoryResponseDto))
                .metaDescription(dto.getMetaDescription())
                .metaKeywords(dto.getMetaKeywords())
                .description(dto.getMetaDescription())
                .status(dto.getStatus())
                .build();
    }
}
