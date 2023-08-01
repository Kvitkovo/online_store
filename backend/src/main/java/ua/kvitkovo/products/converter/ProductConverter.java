package ua.kvitkovo.products.converter;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import ua.kvitkovo.products.dto.ProductRequestDto;
import ua.kvitkovo.products.dto.ProductResponseDto;
import ua.kvitkovo.products.dto.SizeRequestDto;
import ua.kvitkovo.products.dto.SizeResponseDto;
import ua.kvitkovo.products.entity.Product;
import ua.kvitkovo.products.entity.Size;
import ua.kvitkovo.products.service.CategoryService;
import ua.kvitkovo.products.service.ColorService;
import ua.kvitkovo.products.service.SizeService;

/**
 * @author Andriy Gaponov
 */
@Service
@AllArgsConstructor
public class ProductConverter {

    private final SizeConverter sizeConverter;
    private final ColorConverter colorConverter;
    private final CategoryConverter categoryConverter;

    @Lazy
    private CategoryService categoryService;
    @Lazy
    private ColorService colorService;
    @Lazy
    private SizeService sizeService;

    public ProductResponseDto convertToDto(final Product entity) {
        if (entity == null) {
            return null;
        }
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
                .build();
    }

    public Product convertToEntity(ProductRequestDto dto) {
        if (dto == null) {
            return null;
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
                .status(dto.getStatus())
                .category(categoryConverter.convertToEntity(categoryService.findById(dto.getCategoryId())))
                .color(colorConverter.convertToEntity(colorService.findById(dto.getColorId())))
                .size(sizeConverter.convertToEntity(sizeService.findById(dto.getSizeId())))
                .build();
    }
}
