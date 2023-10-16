package ua.kvitkovo.orders.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.dto.admin.OrderAdminResponseDto;
import ua.kvitkovo.orders.entity.Order;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface OrderDtoMapper {

    @Mapping(target = "orderItems", ignore = true)
    Order mapDtoRequestToEntity(OrderRequestDto dto);

    Order mapDtoToEntity(OrderResponseDto dto);

    @Mappings({
        @Mapping(target = "shopId", source = "shop.id"),
        @Mapping(target = "managerId", source = "manager.id"),
        @Mapping(target = "customerId", source = "customer.id")
    })
    OrderResponseDto mapEntityToDto(Order order);

    @Mappings({
        @Mapping(target = "shopId", source = "shop.id"),
        @Mapping(target = "managerId", source = "manager.id"),
        @Mapping(target = "customerId", source = "customer.id")
    })
    OrderAdminResponseDto mapEntityToDtoForAdmin(Order order);

    List<OrderResponseDto> mapEntityToDto(List<Order> entities);
}
