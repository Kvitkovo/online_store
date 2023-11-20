package ua.kvitkovo.catalog.converter;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import ua.kvitkovo.catalog.dto.request.ProductRequestDto;
import ua.kvitkovo.catalog.dto.response.ProductResponseDto;
import ua.kvitkovo.catalog.dto.response.ProductResponseForCardDto;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.images.converter.ImageDtoMapper;
import ua.kvitkovo.orders.service.OrderService;

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
            @Mapping(target = "sizeId", source = "size.id"),
            @Mapping(target = "available", expression =
                    "java(entity.getStock() - getInOrders(orderService, entity.getId()) <= 0 ? " +
                            "ua.kvitkovo.catalog.entity.ProductAccessibility.UNAVAILABLE : " +
                            "ua.kvitkovo.catalog.entity.ProductAccessibility.AVAILABLE)")
    })
    ProductResponseDto mapEntityToDto(Product entity, @Context OrderService orderService);

    @Mappings({
            @Mapping(target = "categoryName", source = "category.name"),
            @Mapping(target = "categoryId", source = "category.id"),
            @Mapping(target = "productTypeName", source = "productType.name"),
            @Mapping(target = "colorName", source = "color.name"),
            @Mapping(target = "sizeName", source = "size.name"),
            @Mapping(target = "available", expression =
                    "java(entity.getStock() - getInOrders(orderService, entity.getId()) <= 0 ? " +
                            "ua.kvitkovo.catalog.entity.ProductAccessibility.UNAVAILABLE : " +
                            "ua.kvitkovo.catalog.entity.ProductAccessibility.AVAILABLE)")
    })
    ProductResponseForCardDto mapEntityToCardDto(Product entity, @Context OrderService orderService);

    Product mapDtoToEntity(ProductResponseDto dto);

    Product mapDtoRequestToEntity(ProductRequestDto dto);

    List<ProductResponseDto> mapEntityToDto(List<Product> entities,
                                            @Context OrderService orderService);

    default int getInOrders(OrderService orderService, Long productId) {
        return orderService.getInOrders(productId);
    }
}
