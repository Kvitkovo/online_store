package ua.kvitkovo.images.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.images.dto.ImageRequestDto;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface ImageMapper {

    ImageResponseDto convertToDto(Image image);

    ImageResponseDto dtoToDto(ImageRequestDto dto);

    Image convertToEntity(ImageRequestDto dto);

    Image convertToEntity(ImageResponseDto dto);
}
