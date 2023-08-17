package ua.kvitkovo.images.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import ua.kvitkovo.catalog.converter.ProductMapper;
import ua.kvitkovo.catalog.service.ProductService;
import ua.kvitkovo.images.dto.ImageRequestDto;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public abstract class ImageDtoMapper {

    @Autowired
    protected ProductService productService;
    @Autowired
    protected ProductMapper productMapper;

    @Mapping(target = "productId", source = "product.id")
    public abstract ImageResponseDto mapEntityToDto(Image entity);

    @Mapping(target = "product", expression = "java(productMapper.mapDtoToEntity(productService.findById(dto.getId())))")
    public abstract Image mapDtoToEntity(ImageResponseDto dto);

    public abstract Image mapDtoRequestToDto(ImageRequestDto dto);

    public abstract List<ImageResponseDto> mapEntityToDto(List<Image> entities);
}
