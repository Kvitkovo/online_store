package ua.kvitkovo.catalog.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.dto.ColorRequestDto;
import ua.kvitkovo.catalog.dto.ColorResponseDto;
import ua.kvitkovo.catalog.entity.Color;
import ua.kvitkovo.utils.Mapper;

/**
 * @author Andriy Gaponov
 */
@Service
public class ColorMapper implements Mapper<Color, ColorResponseDto, ColorRequestDto> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ColorResponseDto mapEntityToDto(Color source) throws RuntimeException {
        ColorResponseDto responseDto = modelMapper.map(source, ColorResponseDto.class);
        return responseDto;
    }

    @Override
    public Color mapDtoToEntity(ColorResponseDto source) throws RuntimeException {
        Color entity = modelMapper.map(source, Color.class);
        return entity;
    }

    @Override
    public ColorResponseDto mapDtoRequestToDto(ColorRequestDto source) throws RuntimeException {
        ColorResponseDto responseDto = modelMapper.map(source, ColorResponseDto.class);
        return responseDto;
    }
}
