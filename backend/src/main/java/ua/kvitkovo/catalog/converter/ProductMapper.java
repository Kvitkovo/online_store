package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.ProductRequestDto;
import ua.kvitkovo.catalog.dto.ProductResponseDto;
import ua.kvitkovo.catalog.entity.Product;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductResponseDto convertToDto(Product product);

    ProductResponseDto dtoToDto(ProductRequestDto dto);

    Product convertToEntity(ProductRequestDto dto);

    Product convertToEntity(ProductResponseDto dto);
}
