package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.ProductRequestDto;
import ua.kvitkovo.catalog.dto.ProductResponseDto;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.images.converter.ImageDtoMapper;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring", uses = {ImageDtoMapper.class})
public interface ProductDtoMapper {

    ProductResponseDto mapEntityToDto(Product entity);

    Product mapDtoToEntity(ProductResponseDto dto);

    Product mapDtoRequestToEntity(ProductRequestDto dto);

    List<ProductResponseDto> mapEntityToDto(List<Product> entities);
}
