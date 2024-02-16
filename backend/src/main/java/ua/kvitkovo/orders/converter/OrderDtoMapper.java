package ua.kvitkovo.orders.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.images.entity.Image;
import ua.kvitkovo.orders.dto.OrderItemResponseDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.dto.ProductResponseDto;
import ua.kvitkovo.orders.dto.admin.OrderAdminResponseDto;
import ua.kvitkovo.orders.entity.Order;
import ua.kvitkovo.orders.entity.OrderItem;

import java.util.List;

@Mapper(componentModel = "spring", imports = Image.class)
public interface OrderDtoMapper {

    Order mapDtoToEntity(OrderResponseDto dto);

    @Mapping(target = "shopId", source = "shop.id")
    @Mapping(target = "managerId", source = "manager.id")
    @Mapping(target = "customerId", source = "customer.id")
    OrderResponseDto mapEntityToDto(Order order);

    @Mapping(target = "shopId", source = "shop.id")
    @Mapping(target = "managerId", source = "manager.id")
    @Mapping(target = "customerId", source = "customer.id")
    OrderAdminResponseDto mapEntityToDtoForAdmin(Order order);

    List<OrderResponseDto> mapEntityToDto(List<Order> entities);

    OrderItemResponseDto mapEntityToDto(OrderItem orderItem);

    @Mapping(target = "mainImageSmallUrl", expression =
            """
                java(product.getImages().stream().filter(i -> i.isMainImage()).findFirst().map(Image::getUrlSmall).orElse(""))
            """)
    ProductResponseDto mapEntityToDto(Product product);
}
