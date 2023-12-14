package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.kvitkovo.catalog.dto.response.CategoryResponseDto;
import ua.kvitkovo.catalog.entity.Category;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryDtoMapper {

    @Mapping(target = "hasSubCategory", expression = "java(entity.getChildren() != null && !entity.getChildren().isEmpty())")
    CategoryResponseDto mapEntityToDto(Category entity);

    List<CategoryResponseDto> mapEntityToDto(List<Category> entities);
}
