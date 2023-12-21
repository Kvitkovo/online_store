package ua.kvitkovo.orders.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.dto.admin.OrderAdminResponseDto;
import ua.kvitkovo.orders.entity.Order;

import java.util.List;

@Mapper(componentModel = "spring")
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
}
