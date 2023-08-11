package ua.kvitkovo.catalog.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.dto.SizeRequestDto;
import ua.kvitkovo.catalog.dto.SizeResponseDto;
import ua.kvitkovo.catalog.entity.Size;
import ua.kvitkovo.utils.Mapper;

/**
 * @author Andriy Gaponov
 */
@Service
public class SizeMapper implements Mapper<Size, SizeResponseDto, SizeRequestDto> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public SizeResponseDto mapEntityToDto(Size source) throws RuntimeException {
        SizeResponseDto responseDto = modelMapper.map(source, SizeResponseDto.class);
        return responseDto;
    }

    @Override
    public Size mapDtoToEntity(SizeResponseDto source) throws RuntimeException {
        Size entity = modelMapper.map(source, Size.class);
        return entity;
    }

    @Override
    public SizeResponseDto mapDtoRequestToDto(SizeRequestDto source) throws RuntimeException {
        SizeResponseDto responseDto = modelMapper.map(source, SizeResponseDto.class);
        return responseDto;
    }
}
