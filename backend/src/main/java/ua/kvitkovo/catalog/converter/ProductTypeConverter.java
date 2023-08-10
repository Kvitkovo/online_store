package ua.kvitkovo.catalog.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.dto.ProductTypeRequestDto;
import ua.kvitkovo.catalog.dto.ProductTypeResponseDto;
import ua.kvitkovo.catalog.entity.ProductType;

/**
 * @author Andriy Gaponov
 */
@Service
@AllArgsConstructor
public class ProductTypeConverter {

    public ProductTypeResponseDto convertToDto(final ProductType entity) {
        if (entity == null) {
            return null;
        }
        return ProductTypeResponseDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .alias(entity.getAlias())
                .build();
    }

    public ProductType convertToEntity(ProductTypeResponseDto dto) {
        if (dto == null) {
            return null;
        }
        return ProductType.builder()
                .id(dto.getId())
                .name(dto.getName())
                .alias(dto.getAlias())
                .build();
    }

    public ProductType convertToEntity(ProductTypeRequestDto dto) {
        if (dto == null) {
            return null;
        }
        return ProductType.builder()
                .name(dto.getName())
                .build();
    }
}
