package ua.kvitkovo.catalog.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.dto.CategoryRequestDto;
import ua.kvitkovo.catalog.dto.CategoryResponseDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.utils.Mapper;

/**
 * @author Andriy Gaponov
 */
@Service
public class CategoryMapper implements Mapper<Category, CategoryResponseDto, CategoryRequestDto> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryResponseDto mapEntityToDto(Category source) throws RuntimeException {
        CategoryResponseDto responseDto = modelMapper.map(source, CategoryResponseDto.class);
        return responseDto;
    }

    @Override
    public Category mapDtoToEntity(CategoryResponseDto source) throws RuntimeException {
        Category entity = modelMapper.map(source, Category.class);
        return entity;
    }

    @Override
    public CategoryResponseDto mapDtoRequestToDto(CategoryRequestDto source) throws RuntimeException {
        CategoryResponseDto responseDto = modelMapper.map(source, CategoryResponseDto.class);
        return responseDto;
    }
}
