package ua.kvitkovo.images.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.converter.ProductMapper;
import ua.kvitkovo.catalog.service.ProductService;
import ua.kvitkovo.images.dto.ImageRequestDto;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;
import ua.kvitkovo.utils.Mapper;

/**
 * @author Andriy Gaponov
 */
@Service
public class ImageMapper implements Mapper<Image, ImageResponseDto, ImageRequestDto> {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductMapper productMapper;

    @Override
    public ImageResponseDto mapEntityToDto(Image source) throws RuntimeException {
        ImageResponseDto responseDto = modelMapper.map(source, ImageResponseDto.class);
        responseDto.setProductId(source.getProduct().getId());
        return responseDto;
    }

    @Override
    public Image mapDtoToEntity(ImageResponseDto source) throws RuntimeException {
        Image entity = modelMapper.map(source, Image.class);
        entity.setProduct(productMapper.mapDtoToEntity(productService.findById(source.getProductId())));
        return entity;
    }

    @Override
    public ImageResponseDto mapDtoRequestToDto(ImageRequestDto source) throws RuntimeException {
        ImageResponseDto responseDto = modelMapper.map(source, ImageResponseDto.class);
        return responseDto;
    }
}
