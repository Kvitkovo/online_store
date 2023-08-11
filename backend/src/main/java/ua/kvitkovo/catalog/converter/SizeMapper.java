package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.SizeRequestDto;
import ua.kvitkovo.catalog.dto.SizeResponseDto;
import ua.kvitkovo.catalog.entity.Size;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface SizeMapper {

    SizeResponseDto convertToDto(Size size);

    SizeResponseDto dtoToDto(SizeRequestDto dto);

    Size convertToEntity(SizeRequestDto dto);

    Size convertToEntity(SizeResponseDto dto);
}
