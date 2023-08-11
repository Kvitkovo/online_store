package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.ProductTypeRequestDto;
import ua.kvitkovo.catalog.dto.ProductTypeResponseDto;
import ua.kvitkovo.catalog.entity.ProductType;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface ProductTypeMapper {

    ProductTypeResponseDto convertToDto(ProductType productType);

    ProductTypeResponseDto dtoToDto(ProductTypeRequestDto dto);

    ProductType convertToEntity(ProductTypeRequestDto dto);

    ProductType convertToEntity(ProductTypeResponseDto dto);
}
