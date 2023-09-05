package ua.kvitkovo.orders.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.entity.Order;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface OrderDtoMapper {

    @Mapping(target = "orderItems", ignore = true)
    Order mapDtoRequestToEntity(OrderRequestDto dto);

    OrderResponseDto mapEntityToDto(Order order);
}