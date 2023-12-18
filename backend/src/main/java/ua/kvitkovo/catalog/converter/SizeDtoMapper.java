package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.request.SizeRequestDto;
import ua.kvitkovo.catalog.dto.response.SizeResponseDto;
import ua.kvitkovo.catalog.entity.Size;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SizeDtoMapper {

    SizeResponseDto mapEntityToDto(Size entity);

    Size mapDtoToEntity(SizeResponseDto dto);

    List<SizeResponseDto> mapEntityToDto(List<Size> entities);
}
