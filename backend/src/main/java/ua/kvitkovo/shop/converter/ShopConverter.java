package ua.kvitkovo.shop.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.shop.dto.ShopResponseDto;
import ua.kvitkovo.shop.entity.Shop;

/**
 * @author Andriy Gaponov
 */
@Service
@AllArgsConstructor
public class ShopConverter {

    public ShopResponseDto convertToDto(Shop entity) {
        if (entity == null) {
            return null;
        }
        return ShopResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .alias(entity.getAlias())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .city(entity.getCity())
                .address(entity.getAddress())
                .build();
    }

    public Shop convertToEntity(ShopRequestDto dto) {
        if (dto == null) {
            return null;
        }

        return Shop.builder()
                .title(dto.getTitle())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .city(dto.getCity())
                .address(dto.getAddress())
                .build();
    }

    public Shop convertToEntity(ShopResponseDto dto) {
        if (dto == null) {
            return null;
        }
        return Shop.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .alias(dto.getAlias())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .city(dto.getCity())
                .address(dto.getAddress())
                .build();
    }
}
