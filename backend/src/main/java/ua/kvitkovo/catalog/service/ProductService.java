package ua.kvitkovo.catalog.service;

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
import ua.kvitkovo.catalog.converter.ProductMapper;
import ua.kvitkovo.catalog.dto.FilterRequestDto;
import ua.kvitkovo.catalog.dto.ProductRequestDto;
import ua.kvitkovo.catalog.dto.ProductResponseDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.catalog.entity.ProductStatus;
import ua.kvitkovo.catalog.repository.CategoryRepository;
import ua.kvitkovo.catalog.repository.ProductRepository;
import ua.kvitkovo.catalog.validator.ProductDtoValidator;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
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
    private final CategoryService categoryService;
    private final ColorService colorService;
    private final ProductDtoValidator productDtoValidator;
    private final ErrorUtils errorUtils;
    private final TransliterateUtils transliterateUtils;
    private final SizeService sizeService;
    private final ProductTypeService productTypeService;
    private final ProductMapper productMapper;

    public Collection<ProductResponseDto> getAll() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productMapper::convertToDto)
                .toList();
    }

    public ProductResponseDto findById(long id) throws ItemNotFoundException {
        Optional<Product> optional = productRepository.findById(id);
        if (optional.isEmpty()) {
            throw new ItemNotFoundException("Product not found");
        }
        return productMapper.convertToDto(optional.get());
    }

    @Transactional
    public ProductResponseDto addProduct(ProductRequestDto dto, BindingResult bindingResult) {
        productDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        ProductResponseDto productResponseDto = productMapper.dtoToDto(dto);
        productResponseDto.setCategory(categoryService.findById(dto.getCategoryId()));
        addDefaultValuesToDto(dto, productResponseDto);

        Product product = productMapper.convertToEntity(productResponseDto);
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
        productDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        BeanUtils.copyProperties(dto, productResponseDto, Helper.getNullPropertyNames(dto));
        addDefaultValuesToDto(dto, productResponseDto);

        Product product = productMapper.convertToEntity(productResponseDto);
        product.setId(id);

        productRepository.save(product);
        return findById(id);
    }

    private void addDefaultValuesToDto(ProductRequestDto dto, ProductResponseDto productResponseDto){
        productResponseDto.setCategory(categoryService.findById(dto.getCategoryId()));
        if (dto.getHeight() > 0) {
            productResponseDto.setSize(sizeService.findByProductByHeight(dto.getHeight()));
        }
        if (dto.getProductTypeId() > 0) {
            productResponseDto.setProductType(productTypeService.findById(dto.getProductTypeId()));
        }
        if (dto.getColorId() > 0) {
            productResponseDto.setColor(colorService.findById(dto.getColorId()));
        }
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
        return products.map(productMapper::convertToDto);
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
        return products.map(productMapper::convertToDto);
    }

    public Page<ProductResponseDto> getDiscounted(Pageable pageable) {
        Page<Product> products = productRepository.findAllByDiscountGreaterThanAndStatusEquals(pageable, BigDecimal.valueOf(0), ProductStatus.ACTIVE);
        if (products.isEmpty()) throw new ItemNotFoundException("Product not found");
        return products.map(productMapper::convertToDto);
    }

    public ProductResponseDto enableProduct(Long id) {
        ProductResponseDto productResponseDto = findById(id);

        Product product = productMapper.convertToEntity(productResponseDto);
        product.setId(id);
        product.setStatus(ProductStatus.ACTIVE);

        productRepository.save(product);
        return findById(id);
    }

    public ProductResponseDto disableProduct(Long id) {
        ProductResponseDto productResponseDto = findById(id);

        Product product = productMapper.convertToEntity(productResponseDto);
        product.setId(id);
        product.setStatus(ProductStatus.NO_ACTIVE);

        productRepository.save(product);
        return findById(id);
    }
}