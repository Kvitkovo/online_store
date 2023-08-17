package ua.kvitkovo.shop.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.shop.dto.ShopResponseDto;
import ua.kvitkovo.shop.entity.Shop;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface ShopDtoMapper {

    ShopResponseDto mapEntityToDto(Shop entity);
    Shop mapDtoToEntity(ShopResponseDto dto);
    Shop mapDtoRequestToDto(ShopRequestDto dto);
}
