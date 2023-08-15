package ua.kvitkovo.catalog.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.dto.ProductTypeRequestDto;
import ua.kvitkovo.catalog.dto.ProductTypeResponseDto;
import ua.kvitkovo.catalog.entity.ProductType;
import ua.kvitkovo.utils.Mapper;

/**
 * @author Andriy Gaponov
 */
@Service
public class ProductTypeMapper implements Mapper<ProductType, ProductTypeResponseDto, ProductTypeRequestDto> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ProductTypeResponseDto mapEntityToDto(ProductType source) throws RuntimeException {
        ProductTypeResponseDto responseDto = modelMapper.map(source, ProductTypeResponseDto.class);
        return responseDto;
    }

    @Override
    public ProductType mapDtoToEntity(ProductTypeResponseDto source) throws RuntimeException {
        ProductType entity = modelMapper.map(source, ProductType.class);
        return entity;
    }

    @Override
    public ProductTypeResponseDto mapDtoRequestToDto(ProductTypeRequestDto source) throws RuntimeException {
        ProductTypeResponseDto responseDto = modelMapper.map(source, ProductTypeResponseDto.class);
        return responseDto;
    }
}
