package ua.kvitkovo.orders.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.kvitkovo.orders.dto.OrderItemRequestDto;
import ua.kvitkovo.orders.dto.OrderItemResponseDto;
import ua.kvitkovo.orders.entity.OrderItem;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface OrderItemDtoMapper {

    @Mapping(target = "orderItemsCompositions", ignore = true)
    OrderItem mapDtoRequestToEntity(OrderItemRequestDto dto);

    OrderItemResponseDto mapEntityToDto(OrderItem orderItem);
}
