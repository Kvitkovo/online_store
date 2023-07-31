package ua.kvitkovo.products.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ua.kvitkovo.products.dto.SizeRequestDto;
import ua.kvitkovo.products.dto.SizeResponseDto;
import ua.kvitkovo.products.entity.Size;

/**
 * @author Andriy Gaponov
 */
@Service
@AllArgsConstructor
public class SizeConverter {

    public SizeResponseDto convertToDto(final Size entity) {
        if (entity == null) {
            return null;
        }
        return SizeResponseDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .alias(entity.getAlias())
                .min(entity.getMin())
                .max(entity.getMax())
                .build();
    }

    public Size convertToEntity(SizeResponseDto dto) {
        if (dto == null) {
            return null;
        }
        return Size.builder()
                .id(dto.getId())
                .name(dto.getName())
                .alias(dto.getAlias())
                .min(dto.getMin())
                .max(dto.getMax())
                .build();
    }

    public Size convertToEntity(SizeRequestDto dto) {
        if (dto == null) {
            return null;
        }
        return Size.builder()
                .name(dto.getName())
                .min(dto.getMin())
                .max(dto.getMax())
                .build();
    }
}
