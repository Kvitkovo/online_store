package ua.kvitkovo.orders.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.entity.Order;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface OrderDtoMapper {

    Order mapDtoRequestToEntity(OrderRequestDto dto);

    OrderResponseDto mapEntityToDto(Order order);
}
