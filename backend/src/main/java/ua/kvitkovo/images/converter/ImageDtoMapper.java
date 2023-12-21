package ua.kvitkovo.images.converter;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;

@Mapper(componentModel = "spring")
public interface ImageDtoMapper {

    @Mapping(target = "productId", source = "product.id")
    ImageResponseDto mapEntityToDto(Image entity);

    Image mapDtoToEntity(ImageResponseDto dto);

    List<ImageResponseDto> mapEntityToDto(List<Image> entities);
}
