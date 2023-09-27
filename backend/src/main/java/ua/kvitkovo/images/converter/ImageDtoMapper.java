package ua.kvitkovo.images.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.kvitkovo.images.dto.ImageRequestDto;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface ImageDtoMapper {

    @Mapping(target = "productId", source = "product.id")
    ImageResponseDto mapEntityToDto(Image entity);

    Image mapDtoToEntity(ImageResponseDto dto);

    Image mapDtoRequestToDto(ImageRequestDto dto);

    List<ImageResponseDto> mapEntityToDto(List<Image> entities);
}
