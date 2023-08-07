package ua.kvitkovo.products.service;

import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.products.converter.ProductConverter;
import ua.kvitkovo.products.dto.FilterRequestDto;
import ua.kvitkovo.products.dto.ProductRequestDto;
import ua.kvitkovo.products.dto.ProductResponseDto;
import ua.kvitkovo.products.entity.Category;
import ua.kvitkovo.products.entity.Product;
import ua.kvitkovo.products.entity.ProductStatus;
import ua.kvitkovo.products.repository.CategoryRepository;
import ua.kvitkovo.products.repository.ProductRepository;
import ua.kvitkovo.products.validator.ProductDtoValidator;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

import java.math.BigDecimal;
import java.util.*;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
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
        product.setAlias(transliterateUtils.getAlias(Product.class.getSimpleName(), dto.getTitle()));
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

    public Page<ProductResponseDto> getAllByCategory(Pageable pageable, long categoryId) {
        Category category = categoryRepository.
                findById(categoryId).
                orElseThrow(() -> new ItemNotFoundException("Category not found"));

        Page<Product> products = productRepository.findAllByCategoryIdAndStatusEquals(pageable, category.getId(), ProductStatus.ACTIVE);
        if (products.isEmpty()) throw new ItemNotFoundException("Product not found");
        return products.map(productConverter::convertToDto);
    }

    public Page<ProductResponseDto> getAllByFilter(FilterRequestDto filter, Pageable pageable) {
        Specification<Object> where = Specification.where((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getPriceFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), new BigDecimal(filter.getPriceFrom())));
            }
            if (filter.getPriceTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), new BigDecimal(filter.getPriceTo())));
            }
            if (filter.getTitle() != null) {
                predicates.add(criteriaBuilder.like(root.get("title"), "%" + filter.getTitle() + "%"));
            }
            predicates.add(criteriaBuilder.equal(root.get("status"), ProductStatus.ACTIVE));

            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        });
        Page<Product> products = productRepository.findAll(where, pageable);

        if (products.isEmpty()) throw new ItemNotFoundException("Product not found");
        return products.map(productConverter::convertToDto);
    }

    public Page<ProductResponseDto> getDiscounted(Pageable pageable) {
        Page<Product> products = productRepository.findAllByDiscountGreaterThanAndStatusEquals(pageable, BigDecimal.valueOf(0), ProductStatus.ACTIVE);
        if (products.isEmpty()) throw new ItemNotFoundException("Product not found");
        return products.map(productConverter::convertToDto);
    }

    public ProductResponseDto enableProduct(Long id) {
        ProductResponseDto productResponseDto = findById(id);

        Product product = productConverter.convertToEntity(productResponseDto);
        product.setId(id);
        product.setStatus(ProductStatus.ACTIVE);

        productRepository.save(product);
        return findById(id);
    }

    public ProductResponseDto disableProduct(Long id) {
        ProductResponseDto productResponseDto = findById(id);

        Product product = productConverter.convertToEntity(productResponseDto);
        product.setId(id);
        product.setStatus(ProductStatus.NO_ACTIVE);

        productRepository.save(product);
        return findById(id);
    }
}
