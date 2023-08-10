package ua.kvitkovo.catalog.converter;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.dto.ProductRequestDto;
import ua.kvitkovo.catalog.dto.ProductResponseDto;
import ua.kvitkovo.catalog.entity.*;
import ua.kvitkovo.catalog.service.CategoryService;
import ua.kvitkovo.catalog.service.ColorService;
import ua.kvitkovo.catalog.service.ProductTypeService;
import ua.kvitkovo.catalog.service.SizeService;
import ua.kvitkovo.images.converter.ImageConverter;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;
import ua.kvitkovo.images.service.ImageService;

import java.util.List;
import java.util.Set;

/**
 * @author Andriy Gaponov
 */
@Service
@AllArgsConstructor
public class ProductConverter {

    private final SizeConverter sizeConverter;
    private final ColorConverter colorConverter;
    private final CategoryConverter categoryConverter;
    private final ProductTypeConverter productTypeConverter;

    @Lazy
    private CategoryService categoryService;
    @Lazy
    private ProductTypeService productTypeService;
    @Lazy
    private ColorService colorService;
    @Lazy
    private SizeService sizeService;

    public ProductResponseDto convertToDto(final Product entity) {
        if (entity == null) {
            return null;
        }

        Set<Image> images = entity.getImages();
        List<ImageResponseDto> imageResponseDtos = images.stream().map(image -> ImageResponseDto.builder()
                .id(image.getId())
                .name(image.getName())
                .productId(image.getProduct().getId())
                .mainImage(image.isMainImage())
                .url(image.getUrl())
                .urlSmall(image.getUrlSmall())
                .build()
        ).toList();

        return ProductResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .alias(entity.getAlias())
                .size(sizeConverter.convertToDto(entity.getSize()))
                .color(colorConverter.convertToDto(entity.getColor()))
                .price(entity.getPrice())
                .discount(entity.getDiscount())
                .priceWithDiscount(entity.getPriceWithDiscount())
                .status(entity.getStatus())
                .updated(entity.getUpdated())
                .created(entity.getCreated())
                .description(entity.getDescription())
                .metaKeywords(entity.getMetaKeywords())
                .metaDescription(entity.getMetaDescription())
                .category(categoryConverter.convertToDto(entity.getCategory()))
                .allowAddToConstructor(entity.isAllowAddToConstructor())
                .productType(productTypeConverter.convertToDto(entity.getProductType()))
                .images(imageResponseDtos)
                .build();
    }

    public Product convertToEntity(ProductResponseDto dto) {
        if (dto == null) {
            return null;
        }
        return Product.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .alias(dto.getAlias())
                .size(sizeConverter.convertToEntity(dto.getSize()))
                .color(colorConverter.convertToEntity(dto.getColor()))
                .price(dto.getPrice())
                .discount(dto.getDiscount())
                .priceWithDiscount(dto.getPriceWithDiscount())
                .status(dto.getStatus())
                .updated(dto.getUpdated())
                .created(dto.getCreated())
                .description(dto.getDescription())
                .metaKeywords(dto.getMetaKeywords())
                .metaDescription(dto.getMetaDescription())
                .category(categoryConverter.convertToEntity(dto.getCategory()))
                .allowAddToConstructor(dto.isAllowAddToConstructor())
                .productType(productTypeConverter.convertToEntity(dto.getProductType()))
                .build();
    }

    public Product convertToEntity(ProductRequestDto dto) {
        if (dto == null) {
            return null;
        }

        ProductStatus productStatus = ProductStatus.ACTIVE;
        if (dto.getStatus() != null) {
            productStatus = dto.getStatus();
        }

        Color color = null;
        if (dto.getColorId() > 0) {
            color = colorConverter.convertToEntity(colorService.findById(dto.getColorId()));
        }

        Size size = null;
        if (dto.getHeight() > 0) {
            size = sizeConverter.convertToEntity(sizeService.findByProductByHeight(dto.getHeight()));
        }

        ProductType type = null;
        if (dto.getProductTypeId() > 0) {
            type = productTypeConverter.convertToEntity(productTypeService.findById(dto.getProductTypeId()));
        }

        return Product.builder()
                .title(dto.getTitle())
                .price(dto.getPrice())
                .discount(dto.getDiscount())
                .priceWithDiscount(dto.getPriceWithDiscount())
                .status(dto.getStatus())
                .description(dto.getDescription())
                .metaKeywords(dto.getMetaKeywords())
                .metaDescription(dto.getMetaDescription())
                .status(productStatus)
                .category(categoryConverter.convertToEntity(categoryService.findById(dto.getCategoryId())))
                .color(color)
                .size(size)
                .allowAddToConstructor(dto.isAllowAddToConstructor())
                .productType(type)
                .build();
    }
}
