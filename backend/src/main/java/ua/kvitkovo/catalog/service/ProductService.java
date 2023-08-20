package ua.kvitkovo.catalog.service;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.converter.ProductDtoMapper;
import ua.kvitkovo.catalog.dto.FilterRequestDto;
import ua.kvitkovo.catalog.dto.ProductRequestDto;
import ua.kvitkovo.catalog.dto.ProductResponseDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.entity.Color;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.catalog.entity.ProductStatus;
import ua.kvitkovo.catalog.entity.ProductType;
import ua.kvitkovo.catalog.entity.Size;
import ua.kvitkovo.catalog.repository.CategoryRepository;
import ua.kvitkovo.catalog.repository.ColorRepository;
import ua.kvitkovo.catalog.repository.ProductRepository;
import ua.kvitkovo.catalog.repository.ProductTypeRepository;
import ua.kvitkovo.catalog.repository.SizeRepository;
import ua.kvitkovo.catalog.validator.ProductDtoValidator;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SizeRepository sizeRepository;
    private final ColorRepository colorRepository;
    private final ProductTypeRepository productTypeRepository;
    private final ProductDtoValidator productDtoValidator;
    private final ErrorUtils errorUtils;
    private final TransliterateUtils transliterateUtils;
    private final ProductDtoMapper productMapper;

    public Collection<ProductResponseDto> getAll() {
        List<Product> products = productRepository.findAll();
        return productMapper.mapEntityToDto(products);
    }

    public ProductResponseDto findById(long id) throws ItemNotFoundException {
        return productRepository.findById(id)
            .map(productMapper::mapEntityToDto)
            .orElseThrow(() -> new ItemNotFoundException("Product not found"));
    }

    @Transactional
    public ProductResponseDto addProduct(ProductRequestDto dto, BindingResult bindingResult) {
        productDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }

        Product product = productMapper.mapDtoRequestToEntity(dto);

        product.setCategory(
            categoryRepository.findById(dto.getCategoryId()).
                orElseThrow(() -> new ItemNotFoundException("Category not found"))
        );
        if (dto.getHeight() > 0) {
            product.setSize(
                sizeRepository.findFirstSizeByHeight(dto.getHeight()).orElse(null)
            );
        }
        if (dto.getProductTypeId() > 0) {
            product.setProductType(
                productTypeRepository.findById(dto.getProductTypeId()).orElse(null)
            );
        }
        if (dto.getColorId() > 0) {
            product.setColor(
                colorRepository.findById(dto.getColorId()).orElse(null)
            );
        }
        product.setAlias(
            transliterateUtils.getAlias(Product.class.getSimpleName(), dto.getTitle()));
        productRepository.save(product);

        log.info("The Product was created");
        return productMapper.mapEntityToDto(product);
    }

    @Transactional
    public ProductResponseDto updateProduct(Long id, ProductRequestDto dto,
        BindingResult bindingResult) {
        ProductResponseDto productResponseDto = findById(id);
        if (!Objects.equals(dto.getTitle(), productResponseDto.getTitle())) {
            productResponseDto.setAlias(
                transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getTitle()));
        }
        productDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        BeanUtils.copyProperties(dto, productResponseDto, Helper.getNullPropertyNames(dto));

        Product product = productMapper.mapDtoToEntity(productResponseDto);
        product.setId(id);

        productRepository.save(product);
        return productMapper.mapEntityToDto(product);
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

        Page<Product> products = productRepository.findAllByCategoryIdAndStatusEquals(pageable,
            category.getId(), ProductStatus.ACTIVE);
        if (products.isEmpty()) {
            return Page.empty();
        } else {
            return products.map(productMapper::mapEntityToDto);
        }
    }

    public Page<ProductResponseDto> getAllByFilter(FilterRequestDto filter, Pageable pageable) {
        Specification<Object> where = Specification.where((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            addPriceFromFilter(filter, root, predicates, criteriaBuilder);
            addPriceToFilter(filter, root, predicates, criteriaBuilder);
            addTitleFilter(filter, root, predicates, criteriaBuilder);
            addCategoryFilter(filter, root, predicates, criteriaBuilder);
            addDiscountFilter(filter, root, predicates, criteriaBuilder);
            addColorFilter(filter, root, predicates);
            addSizesFilter(filter, root, predicates);
            addProductTypesFilter(filter, root, predicates);
            addStatusFilter(filter, root, predicates, criteriaBuilder);

            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        });
        Page<Product> products = productRepository.findAll(where, pageable);

        if (products.isEmpty()) {
            return Page.empty();
        } else {
            return products.map(productMapper::mapEntityToDto);
        }
    }

    private void addProductTypesFilter(FilterRequestDto filter, Root<Object> root,
        List<Predicate> predicates) {
        if (filter.getProductTypes() != null) {
            Expression<String> inExpression = root.get("productType");
            List<ProductType> typeList = getIdsFromString(
                filter.getProductTypes()).stream()
                .map(i -> productTypeRepository.findById(i)
                    .orElseThrow(() -> new ItemNotFoundException("Product type not found")))
                .toList();
            Predicate inPredicate = inExpression.in(typeList);
            predicates.add(inPredicate);
        }
    }

    private void addSizesFilter(FilterRequestDto filter, Root<Object> root,
        List<Predicate> predicates) {
            if (filter.getSizes() != null) {
                Expression<String> inExpression = root.get("size");
                List<Size> sizeList = getIdsFromString(
                    filter.getSizes()).stream()
                    .map(i -> sizeRepository.findById(i)
                        .orElseThrow(() -> new ItemNotFoundException("Size not found")))
                    .toList();
                Predicate inPredicate = inExpression.in(sizeList);
                predicates.add(inPredicate);
            }
    }

    private void addTitleFilter(FilterRequestDto filter, Root<Object> root,
        List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        if (filter.getTitle() != null) {
            predicates.add(
                criteriaBuilder.like(root.get("title"), "%" + filter.getTitle() + "%"));
        }
    }

    private void addPriceToFilter(FilterRequestDto filter, Root<Object> root,
        List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        if (filter.getPriceTo() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"),
                new BigDecimal(filter.getPriceTo())));
        }
    }

    private void addPriceFromFilter(FilterRequestDto filter, Root<Object> root,
        List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        if (filter.getPriceFrom() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"),
                new BigDecimal(filter.getPriceFrom())));
        }
    }

    private void addCategoryFilter(FilterRequestDto filter, Root<Object> root,
        List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        if (filter.getCategoryId() != null) {
            Category category = categoryRepository.findById(filter.getCategoryId())
                .orElseThrow(() -> new ItemNotFoundException("Category not found"));
            predicates.add(
                criteriaBuilder.equal(root.get("category"), category));
        }
    }

    private void addStatusFilter(FilterRequestDto filter, Root<Object> root,
        List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        predicates.add(criteriaBuilder.equal(root.get("status"), ProductStatus.ACTIVE));
    }

    private void addDiscountFilter(FilterRequestDto filter, Root<Object> root,
        List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        if (filter.getDiscount() != null) {
            predicates.add(
                criteriaBuilder.equal(root.get("allowAddToConstructor"), filter.getDiscount()));
        }
    }

    private void addColorFilter(FilterRequestDto filter, Root<Object> root,
        List<Predicate> predicates) {
        if (filter.getColors() != null) {
            Expression<String> inExpression = root.get("color");
            List<Color> colorsList = getIdsFromString(
                filter.getColors()).stream()
                .map(i -> colorRepository.findById(i)
                    .orElseThrow(() -> new ItemNotFoundException("Color not found")))
                .toList();
            Predicate inPredicate = inExpression.in(colorsList);
            predicates.add(inPredicate);
        }
    }

    private List<Long> getIdsFromString(String idsString) {
        String ids = idsString.replaceAll(" ", "");
        String[] idsStrings = ids.split(",");
        return Arrays.stream(idsStrings).map(s -> Long.valueOf(s)).toList();
    }

    public Page<ProductResponseDto> getDiscounted(Pageable pageable) {
        Page<Product> products = productRepository.findAllByDiscountGreaterThanAndStatusEquals(
            pageable, BigDecimal.ZERO, ProductStatus.ACTIVE);
        if (products.isEmpty()) {
            return Page.empty();
        } else {
            return products.map(productMapper::mapEntityToDto);
        }
    }

    public ProductResponseDto enableProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> {
            throw new ItemNotFoundException("Product not found");
        });
        product.setStatus(ProductStatus.ACTIVE);
        productRepository.save(product);
        return productMapper.mapEntityToDto(product);
    }

    public ProductResponseDto disableProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> {
            throw new ItemNotFoundException("Product not found");
        });
        product.setStatus(ProductStatus.NO_ACTIVE);
        productRepository.save(product);
        return productMapper.mapEntityToDto(product);
    }

    public List<Color> getAllColorsIdByCategory(long categoryId) {
        Category category = categoryRepository.
            findById(categoryId).
            orElseThrow(() -> new ItemNotFoundException("Category not found"));

        List<Color> colors = productRepository.findColorByCategoryIdAndStatus(
            category.getId(), ProductStatus.ACTIVE);
        if (colors.isEmpty()) {
            return Collections.EMPTY_LIST;
        } else {
            return colors;
        }
    }

    public List<Size> getAllSizesIdByCategory(long categoryId) {
        Category category = categoryRepository.
            findById(categoryId).
            orElseThrow(() -> new ItemNotFoundException("Category not found"));

        List<Size> sizes = productRepository.findSizeByCategoryIdAndStatus(
            category.getId(), ProductStatus.ACTIVE
        );
        if (sizes.isEmpty()) {
            return Collections.EMPTY_LIST;
        } else {
            return sizes;
        }
    }

    public List<ProductType> getAllProductTypesIdByCategory(long categoryId) {
        Category category = categoryRepository.
            findById(categoryId).
            orElseThrow(() -> new ItemNotFoundException("Category not found"));

        List<ProductType> types = productRepository.findProductTypesByCategoryIdAndStatus(
            category.getId(), ProductStatus.ACTIVE
        );
        if (types.isEmpty()) {
            return Collections.EMPTY_LIST;
        } else {
            return types;
        }
    }
}
