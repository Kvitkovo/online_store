package ua.kvitkovo.shop.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.shop.dto.ShopResponseDto;
import ua.kvitkovo.shop.entity.Shop;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface ShopMapper {

    ShopResponseDto convertToDto(Shop shop);

    ShopResponseDto dtoToDto(ShopRequestDto dto);

    Shop convertToEntity(ShopRequestDto dto);

    Shop convertToEntity(ShopResponseDto dto);
}
