package ua.kvitkovo.catalog.service;

import jakarta.persistence.criteria.*;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.dto.request.FilterRequestDto;
import ua.kvitkovo.catalog.dto.request.ProductRequestDto;
import ua.kvitkovo.catalog.dto.response.FilterPricesIntervalResponseDto;
import ua.kvitkovo.catalog.entity.*;
import ua.kvitkovo.catalog.repository.ProductRepository;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final SizeService sizeService;
    private final ColorService colorService;
    private final ProductTypeService productTypeService;
    private final TransliterateUtils transliterateUtils;

    private static void completeFilterRange(FilterPricesIntervalResponseDto priceRange) {
        if (priceRange.getMaxPrice() == null) {
            priceRange.setMaxPrice(BigDecimal.ZERO);
        }
        if (priceRange.getMinPrice() == null) {
            priceRange.setMinPrice(BigDecimal.ZERO);
        }
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public List<Category> getAllCategoriesByProducts() {
        return productRepository.findCategoriesByStatus(ProductStatus.ACTIVE);
    }

    public List<Size> getAllSizesByProducts() {
        return productRepository.findSizesByStatus(ProductStatus.ACTIVE);
    }

    public List<Color> getAllColorsByProducts() {
        return productRepository.findColorsByStatus(ProductStatus.ACTIVE);
    }

    public List<ProductType> getAllProductTypesByProducts() {
        return productRepository.findProductTypesByStatus(ProductStatus.ACTIVE);
    }

    public Product findById(long id) throws ItemNotFoundException {
        return productRepository.findById(id).orElseThrow(() -> new ItemNotFoundException("Product not found"));
    }

    public FilterPricesIntervalResponseDto getProductPriceRange() {
        FilterPricesIntervalResponseDto priceRange = productRepository.getProductPriceRange();
        completeFilterRange(priceRange);
        return priceRange;
    }

    public Object getProductByCategoryPriceRange(List<Category> categories) {
        FilterPricesIntervalResponseDto priceRange = productRepository.getProductByCategoryPriceRange(categories);
        completeFilterRange(priceRange);
        return priceRange;
    }

    public FilterPricesIntervalResponseDto getDiscountProductPriceRange() {
        FilterPricesIntervalResponseDto priceRange = productRepository.getDiscountProductPriceRange();
        completeFilterRange(priceRange);
        return priceRange;
    }

    @Transactional
    public Product addProduct(ProductRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        Product product = new Product();
        BeanUtils.copyProperties(dto, product);
        product.setCategory(categoryService.findById(dto.getCategoryId()));
        if (dto.getSizeId() != null) {
            product.setSize(sizeService.findById(dto.getSizeId()));
        }
        if (dto.getProductTypeId() != null) {
            product.setProductType(productTypeService.findById(dto.getProductTypeId()));
        }
        if (dto.getColorId() != null) {
            product.setColor(colorService.findById(dto.getColorId()));
        }
        product.setAlias(transliterateUtils.getAlias(Product.class.getSimpleName(), dto.getTitle()));
        productRepository.save(product);

        log.info("The Product was created");
        return product;
    }

    @Transactional
    public Product updateProduct(Long id, ProductRequestDto dto,
                                 BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);

        Product product = findById(id);

        if (!Objects.equals(dto.getTitle(), product.getTitle())) {
            product.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getTitle()));
        }
        BeanUtils.copyProperties(dto, product, Helper.getNullPropertyNames(dto));

        product.setId(id);
        product.setCategory(categoryService.findById(dto.getCategoryId()));
        if (dto.getSizeId() != null) {
            product.setSize(sizeService.findById(dto.getSizeId()));
        }
        if (dto.getProductTypeId() != null) {
            product.setProductType(productTypeService.findById(dto.getProductTypeId()));
        } else {
            product.setProductType(null);
        }

        if (dto.getColorId() != null) {
            product.setColor(colorService.findById(dto.getColorId()));
        } else {
            product.setColor(null);
        }

        productRepository.save(product);
        return product;
    }

    @Transactional
    public void deleteProduct(long id) {
        Product product = findById(id);
        productRepository.delete(product);
    }

    public Page<Product> getAllByCategory(Pageable pageable, long categoryId) {
        List<Category> allByParent = getCategoriesWithChildren(categoryId);

        Page<Product> products = productRepository.findAllByCategoryInAndStatusEquals(pageable,
                allByParent, ProductStatus.ACTIVE);
        if (products.isEmpty()) {
            return Page.empty();
        } else {
            return products;
        }
    }

    public Page<Product> getAllByFilter(FilterRequestDto filter, Pageable pageable) {
        Specification<Object> where = Specification.where((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            addPriceFromFilter(filter, root, predicates, criteriaBuilder);
            addPriceToFilter(filter, root, predicates, criteriaBuilder);
            addTitleFilter(filter, root, predicates, criteriaBuilder);
            addCategoryFilter(filter, root, predicates);
            addDiscountFilter(filter, root, predicates, criteriaBuilder);
            addColorFilter(filter, root, predicates);
            addSizesFilter(filter, root, predicates);
            addProductTypesFilter(filter, root, predicates);
            addStatusFilter(root, predicates, criteriaBuilder);

            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        });
        Page<Product> products = productRepository.findAll(where, pageable);

        if (products.isEmpty()) {
            return Page.empty();
        } else {
            return products;
        }
    }

    private void addProductTypesFilter(FilterRequestDto filter, Root<Object> root,
                                       List<Predicate> predicates) {
        if (filter.getProductTypes() != null) {
            Expression<String> inExpression = root.get("productType");
            List<ProductType> typeList = filter.getProductTypes().stream()
                    .map(productTypeService::findById)
                    .toList();
            Predicate inPredicate = inExpression.in(typeList);
            predicates.add(inPredicate);
        }
    }

    private void addSizesFilter(FilterRequestDto filter, Root<Object> root,
                                List<Predicate> predicates) {
        if (filter.getSizes() != null) {
            Expression<String> inExpression = root.get("size");
            List<Size> sizeList =
                    filter.getSizes().stream()
                            .map(sizeService::findById)
                            .toList();
            Predicate inPredicate = inExpression.in(sizeList);
            predicates.add(inPredicate);
        }
    }

    private void addTitleFilter(FilterRequestDto filter, Root<Object> root,
                                List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        Predicate titlePredicate = null;
        Predicate productTypePredicate = null;
        if (filter.getTitle() != null) {
            titlePredicate = criteriaBuilder.like(root.get("title"), "%" + filter.getTitle() + "%");

            Path<?> productTypePath = root.get("productType");
            Join<Object, Object> productTypeJoin = root.join("productType", JoinType.LEFT);
            productTypePredicate = criteriaBuilder.like(productTypeJoin.get("name"),
                    "%" + filter.getTitle() + "%");

            predicates.add(criteriaBuilder.or(titlePredicate, productTypePredicate));
        }
    }

    private void addPriceToFilter(FilterRequestDto filter, Root<Object> root,
                                  List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        if (filter.getPriceTo() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("priceWithDiscount"),
                    new BigDecimal(filter.getPriceTo())));
        }
    }

    private void addPriceFromFilter(FilterRequestDto filter, Root<Object> root,
                                    List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        if (filter.getPriceFrom() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("priceWithDiscount"),
                    new BigDecimal(filter.getPriceFrom())));
        }
    }

    private void addCategoryFilter(FilterRequestDto filter, Root<Object> root, List<Predicate> predicates) {
        if (filter.getCategories() != null) {
            Expression<String> inExpression = root.get("category");
            List<Category> categoryList =
                    filter.getCategories().stream()
                            .map(categoryService::findById)
                            .toList();
            Predicate inPredicate = inExpression.in(categoryList);
            predicates.add(inPredicate);
        }
    }

    private void addStatusFilter(Root<Object> root, List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        predicates.add(criteriaBuilder.equal(root.get("status"), ProductStatus.ACTIVE));
    }

    private void addDiscountFilter(FilterRequestDto filter, Root<Object> root,
                                   List<Predicate> predicates, CriteriaBuilder criteriaBuilder) {
        if (filter.getDiscount() != null) {
            if (filter.getDiscount()) {
                predicates.add(criteriaBuilder.greaterThan(root.get("discount"), 0));
            } else {
                predicates.add(criteriaBuilder.equal(root.get("discount"), 0));
            }
        }
    }

    private void addColorFilter(FilterRequestDto filter, Root<Object> root,
                                List<Predicate> predicates) {
        if (filter.getColors() != null) {
            Expression<String> inExpression = root.get("color");
            List<Color> colorsList = filter.getColors().stream()
                    .map(colorService::findById)
                    .toList();
            Predicate inPredicate = inExpression.in(colorsList);
            predicates.add(inPredicate);
        }
    }

    public Page<Product> getDiscounted(Pageable pageable) {
        Page<Product> products = productRepository.findAllByDiscountGreaterThanAndStatusEquals(
                pageable, BigDecimal.ZERO, ProductStatus.ACTIVE);
        if (products.isEmpty()) {
            return Page.empty();
        } else {
            return products;
        }
    }

    public Product enableProduct(Long id) {
        Product product = findById(id);
        product.setStatus(ProductStatus.ACTIVE);
        productRepository.save(product);
        return product;
    }

    public Product disableProduct(Long id) {
        Product product = findById(id);
        product.setStatus(ProductStatus.NO_ACTIVE);
        productRepository.save(product);
        return product;
    }

    public List<Category> getCategoriesWithChildren(long categoryId) {
        Category category = categoryService.findById(categoryId);
        List<Category> allByParent = categoryService.findAllByParent(category);
        allByParent.add(category);
        return allByParent;
    }

    public List<Color> getAllColorsIdByCategory(long categoryId) {
        List<Category> allByParent = getCategoriesWithChildren(categoryId);

        List<Color> colors = productRepository.findColorByCategoryIdAndStatus(allByParent, ProductStatus.ACTIVE);
        if (colors.isEmpty()) {
            return Collections.emptyList();
        } else {
            return colors;
        }
    }

    public List<Color> getAllColorsIdByDiscount() {
        List<Color> colors = productRepository.findColorsByDiscountAndStatus(ProductStatus.ACTIVE);
        if (colors.isEmpty()) {
            return Collections.emptyList();
        } else {
            return colors;
        }
    }

    public List<Size> getAllSizesIdByCategory(long categoryId) {
        List<Category> allByParent = getCategoriesWithChildren(categoryId);

        List<Size> sizes = productRepository.findSizeByCategoryIdAndStatus(allByParent, ProductStatus.ACTIVE);
        if (sizes.isEmpty()) {
            return Collections.emptyList();
        } else {
            return sizes;
        }
    }

    public List<Size> getAllSizesIdByDiscount() {
        List<Size> sizes = productRepository.findSizesByDiscountAndStatus(ProductStatus.ACTIVE);
        if (sizes.isEmpty()) {
            return Collections.emptyList();
        } else {
            return sizes;
        }
    }

    public List<ProductType> getAllProductTypesIdByCategory(long categoryId) {
        List<Category> allByParent = getCategoriesWithChildren(categoryId);

        List<ProductType> types = productRepository.findProductTypesByCategoryIdAndStatus(allByParent, ProductStatus.ACTIVE);
        if (types.isEmpty()) {
            return Collections.emptyList();
        } else {
            return types;
        }
    }

    public List<ProductType> getAllProductTypesIdByDiscount() {
        List<ProductType> types = productRepository.findProductTypesByDiscountAndStatus(ProductStatus.ACTIVE);
        if (types.isEmpty()) {
            return Collections.emptyList();
        } else {
            return types;
        }
    }

    private void changeStock(Product product, int stock) {
        product.setStock(stock);
        productRepository.save(product);
    }

    public void minusStock(@NonNull Product product, int stock) {
        changeStock(product, product.getStock() - stock);
    }

    public List<Category> getAllCategoriesByDiscount() {
        List<Category> types = productRepository.findCategoriesByDiscountAndStatus(ProductStatus.ACTIVE);
        if (types.isEmpty()) {
            return Collections.emptyList();
        } else {
            return types;
        }
    }
}
