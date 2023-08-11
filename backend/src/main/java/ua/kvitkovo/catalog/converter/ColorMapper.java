package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.ColorRequestDto;
import ua.kvitkovo.catalog.dto.ColorResponseDto;
import ua.kvitkovo.catalog.entity.Color;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface ColorMapper {

    ColorResponseDto convertToDto(Color color);

    ColorResponseDto dtoToDto(ColorRequestDto dto);

    Color convertToEntity(ColorRequestDto dto);

    Color convertToEntity(ColorResponseDto dto);
}
