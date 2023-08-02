package ua.kvitkovo.products.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.products.converter.ProductConverter;
import ua.kvitkovo.products.converter.SizeConverter;
import ua.kvitkovo.products.dto.ProductRequestDto;
import ua.kvitkovo.products.dto.ProductResponseDto;
import ua.kvitkovo.products.entity.Category;
import ua.kvitkovo.products.entity.Product;
import ua.kvitkovo.products.repository.ProductRepository;
import ua.kvitkovo.products.validator.ProductDtoValidator;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductConverter productConverter;
    private final ProductDtoValidator productDtoValidator;
    private final ErrorUtils errorUtils;
    private final TransliterateUtils transliterateUtils;
    private final SizeService sizeService;

    public Collection<ProductResponseDto> getAll() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productConverter::convertToDto)
                .toList();
    }

    public ProductResponseDto findById(long id) throws ItemNotFoundException {
        Optional<Product> optional = productRepository.findById(id);
        if (optional.isEmpty()) {
            throw new ItemNotFoundException("Product not found");
        }
        return productConverter.convertToDto(optional.get());
    }

    @Transactional
    public ProductResponseDto addProduct(ProductRequestDto dto, BindingResult bindingResult) {
        productDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        Product product = productConverter.convertToEntity(dto);
        product.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getTitle()));
        productRepository.save(product);
        log.info("The Product was created");
        return findById(product.getId());
    }

    @Transactional
    public ProductResponseDto updateProduct(Long id, ProductRequestDto dto, BindingResult bindingResult) {
        ProductResponseDto productResponseDto = findById(id);
        if (!Objects.equals(dto.getTitle(), productResponseDto.getTitle())) {
            productResponseDto.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getTitle()));
        }
        BeanUtils.copyProperties(dto, productResponseDto, Helper.getNullPropertyNames(dto));
        productResponseDto.setSize(sizeService.findByProductByHeight(dto.getHeight()));

        Product product = productConverter.convertToEntity(productResponseDto);

        product.setId(id);

        productDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        productRepository.save(product);
        return findById(id);
    }

    @Transactional
    public void deleteProduct(long id) {
        ProductResponseDto productResponseDto = findById(id);
        productRepository.deleteById(productResponseDto.getId());
    }
}
