package ua.kvitkovo.catalog.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.dto.ColorRequestDto;
import ua.kvitkovo.catalog.dto.ColorResponseDto;
import ua.kvitkovo.catalog.entity.Color;

/**
 * @author Andriy Gaponov
 */
@Service
@AllArgsConstructor
public class ColorConverter {

    public ColorResponseDto convertToDto(final Color entity) {
        if (entity == null) {
            return null;
        }
        return ColorResponseDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .alias(entity.getAlias())
                .build();
    }

    public Color convertToEntity(ColorResponseDto dto) {
        if (dto == null) {
            return null;
        }
        return Color.builder()
                .id(dto.getId())
                .name(dto.getName())
                .alias(dto.getAlias())
                .build();
    }

    public Color convertToEntity(ColorRequestDto dto) {
        if (dto == null) {
            return null;
        }
        return Color.builder()
                .name(dto.getName())
                .build();
    }
}
