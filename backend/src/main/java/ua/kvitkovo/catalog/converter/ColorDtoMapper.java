package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.request.ColorRequestDto;
import ua.kvitkovo.catalog.dto.response.ColorResponseDto;
import ua.kvitkovo.catalog.entity.Color;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ColorDtoMapper {

    ColorResponseDto mapEntityToDto(Color entity);

    Color mapDtoToEntity(ColorResponseDto dto);

    List<ColorResponseDto> mapEntityToDto(List<Color> entities);
}
