package ua.kvitkovo.orders.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.kvitkovo.orders.dto.OrderItemRequestDto;
import ua.kvitkovo.orders.dto.OrderItemResponseDto;
import ua.kvitkovo.orders.entity.OrderItem;

@Mapper(componentModel = "spring")
public interface OrderItemDtoMapper {

    OrderItemResponseDto mapEntityToDto(OrderItem orderItem);
}
