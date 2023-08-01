package ua.kvitkovo.images.converter;

import lombok.AllArgsConstructor;
import ua.kvitkovo.products.converter.ProductConverter;
import ua.kvitkovo.images.dto.ImageRequestDto;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;
import org.springframework.stereotype.Service;
import ua.kvitkovo.products.service.ProductService;

/**
 * @author Andriy Gaponov
 */
@Service
@AllArgsConstructor
public class ImageConverter {

    private final ProductConverter productConverter;
    private final ProductService productService;

    public ImageResponseDto convertToDto(final Image entity) {
        if (entity == null) {
            return null;
        }
        return ImageResponseDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .productId(entity.getProduct().getId())
                .mainImage(entity.isMainImage())
                .url(entity.getUrl())
                .urlSmall(entity.getUrlSmall())
                .build();
    }

    public Image convertToEntity(ImageResponseDto dto) {
        if (dto == null) {
            return null;
        }
        return Image.builder()
                .id(dto.getId())
                .name(dto.getName())
                .product(productConverter.convertToEntity(
                        productService.findById(dto.getProductId())))
                .mainImage(dto.isMainImage())
                .url(dto.getUrl())
                .urlSmall(dto.getUrlSmall())
                .build();
    }

    public Image convertToEntity(ImageRequestDto dto) {
        if (dto == null) {
            return null;
        }

        return Image.builder()
                .product(productConverter.convertToEntity(
                        productService.findById(dto.getProductId())))
                .build();
    }
}
