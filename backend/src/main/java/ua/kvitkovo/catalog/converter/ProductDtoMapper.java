package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
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

    @Mappings({
        @Mapping(target = "categoryId", source = "category.id"),
        @Mapping(target = "productTypeId", source = "productType.id"),
        @Mapping(target = "colorId", source = "color.id"),
        @Mapping(target = "sizeId", source = "size.id")
    })
    ProductResponseDto mapEntityToDto(Product entity);

    Product mapDtoToEntity(ProductResponseDto dto);

    Product mapDtoRequestToEntity(ProductRequestDto dto);

    List<ProductResponseDto> mapEntityToDto(List<Product> entities);
}
