package ua.kvitkovo.catalog.converter;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import ua.kvitkovo.catalog.dto.request.ProductRequestDto;
import ua.kvitkovo.catalog.dto.response.ProductResponseDto;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.images.converter.ImageDtoMapper;
import ua.kvitkovo.orders.entity.Order;
import ua.kvitkovo.orders.entity.OrderItem;
import ua.kvitkovo.orders.entity.OrderStatus;
import ua.kvitkovo.orders.repository.OrderRepository;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

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
            @Mapping(target = "available", expression = "java(entity.getStock() - getInOrders(orderRepository, entity.getId()) <= 0 ? " +
                    "ua.kvitkovo.catalog.entity.ProductAccessibility.UNAVAILABLE : " +
                    "ua.kvitkovo.catalog.entity.ProductAccessibility.AVAILABLE)")
    })
    ProductResponseDto mapEntityToDto(Product entity, @Context OrderRepository orderRepository);

    Product mapDtoToEntity(ProductResponseDto dto);

    Product mapDtoRequestToEntity(ProductRequestDto dto);

    List<ProductResponseDto> mapEntityToDto(List<Product> entities, @Context OrderRepository orderRepository);

    default int getInOrders(OrderRepository orderRepository, Long productId) {
        List<OrderStatus> statusList = List.of(OrderStatus.ACCEPT, OrderStatus.IS_DELIVERED);
        List<Order> orders = orderRepository.findAllByStatusIn(statusList);
        Map<Long, Integer> productQtySum = orders.stream()
                .flatMap(order -> order.getOrderItems().stream())
                .collect(Collectors.groupingBy(
                        orderItem -> orderItem.getProduct().getId(),
                        Collectors.reducing(0, OrderItem::getQty, Integer::sum)
                ));

        Integer inOrders = productQtySum.get(productId);
        return Objects.requireNonNullElse(inOrders, 0);
    }
}
