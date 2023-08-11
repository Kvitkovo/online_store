package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.CategoryRequestDto;
import ua.kvitkovo.catalog.dto.CategoryResponseDto;
import ua.kvitkovo.catalog.entity.Category;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponseDto convertToDto(Category category);

    CategoryResponseDto dtoToDto(CategoryRequestDto dto);

    Category convertToEntity(CategoryRequestDto dto);

    Category convertToEntity(CategoryResponseDto dto);
}
