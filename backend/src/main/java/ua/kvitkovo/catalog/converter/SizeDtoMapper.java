package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.SizeRequestDto;
import ua.kvitkovo.catalog.dto.SizeResponseDto;
import ua.kvitkovo.catalog.entity.Size;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface SizeDtoMapper {

    SizeResponseDto mapEntityToDto(Size entity);

    Size mapDtoToEntity(SizeResponseDto dto);

    Size mapDtoRequestToEntity(SizeRequestDto dto);

    List<SizeResponseDto> mapEntityToDto(List<Size> entities);
}
