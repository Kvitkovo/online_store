package ua.kvitkovo.catalog.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.dto.ProductRequestDto;
import ua.kvitkovo.catalog.dto.ProductResponseDto;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.catalog.service.CategoryService;
import ua.kvitkovo.catalog.service.ColorService;
import ua.kvitkovo.catalog.service.ProductTypeService;
import ua.kvitkovo.catalog.service.SizeService;
import ua.kvitkovo.utils.Mapper;

/**
 * @author Andriy Gaponov
 */
@Service
public class ProductMapper implements Mapper<Product, ProductResponseDto, ProductRequestDto> {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private SizeService sizeService;
    @Autowired
    private ColorService colorService;
    @Autowired
    private ProductTypeService productTypeService;

    @Override
    public ProductResponseDto mapEntityToDto(Product source) throws RuntimeException {
        ProductResponseDto responseDto = modelMapper.map(source, ProductResponseDto.class);
        return responseDto;
    }

    @Override
    public Product mapDtoToEntity(ProductResponseDto source) throws RuntimeException {
        Product entity = modelMapper.map(source, Product.class);
        return entity;
    }

    @Override
    public ProductResponseDto mapDtoRequestToDto(ProductRequestDto source) throws RuntimeException {
        ProductResponseDto responseDto = modelMapper.map(source, ProductResponseDto.class);

        responseDto.setCategory(categoryService.findById(source.getCategoryId()));
        if (source.getHeight() > 0) {
            responseDto.setSize(sizeService.findByProductByHeight(source.getHeight()));
        }
        if (source.getProductTypeId() > 0) {
            responseDto.setProductType(productTypeService.findById(source.getProductTypeId()));
        }
        if (source.getColorId() > 0) {
            responseDto.setColor(colorService.findById(source.getColorId()));
        }
        return responseDto;
    }
}
