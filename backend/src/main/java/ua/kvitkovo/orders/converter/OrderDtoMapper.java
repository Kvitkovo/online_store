package ua.kvitkovo.orders.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;
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

    OrderResponseDto mapEntityToDto(Order order);

    List<OrderResponseDto> mapEntityToDto(List<Order> entities);
}
