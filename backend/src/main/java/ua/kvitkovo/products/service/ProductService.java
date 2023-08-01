package ua.kvitkovo.products.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.products.converter.ProductConverter;
import ua.kvitkovo.products.dto.ProductRequestDto;
import ua.kvitkovo.products.dto.ProductResponseDto;
import ua.kvitkovo.products.dto.SizeRequestDto;
import ua.kvitkovo.products.dto.SizeResponseDto;
import ua.kvitkovo.products.entity.Category;
import ua.kvitkovo.products.entity.Product;
import ua.kvitkovo.products.entity.Size;
import ua.kvitkovo.products.repository.ProductRepository;
import ua.kvitkovo.products.validator.ProductDtoValidator;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.TransliterateUtils;

import java.util.Collection;
import java.util.List;
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
}
