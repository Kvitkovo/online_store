package ua.kvitkovo.shop.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.shop.dto.ShopResponseDto;
import ua.kvitkovo.shop.entity.Shop;

@Mapper(componentModel = "spring")
public interface ShopDtoMapper {

    ShopResponseDto mapEntityToDto(Shop entity);
    Shop mapDtoToEntity(ShopResponseDto dto);
}
