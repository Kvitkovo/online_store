package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.request.CategoryRequestDto;
import ua.kvitkovo.catalog.dto.response.CategoryResponseDto;
import ua.kvitkovo.catalog.entity.Category;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface CategoryDtoMapper {

    CategoryResponseDto mapEntityToDto(Category entity);

    Category mapDtoToEntity(CategoryResponseDto dto);

    Category mapDtoRequestToEntity(CategoryRequestDto dto);

    List<CategoryResponseDto> mapEntityToDto(List<Category> entities);
}
