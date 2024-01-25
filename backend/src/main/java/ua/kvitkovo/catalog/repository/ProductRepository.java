package ua.kvitkovo.catalog.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.catalog.entity.*;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends ProductRepositoryBasic {

    Page<Product> findAllByCategoryInAndStatusEquals(Pageable pageable, List<Category> id,
                                                     ProductStatus status);

    Page<Product> findAllByDiscountGreaterThanAndStatusEquals(Pageable pageable,
                                                              BigDecimal discount, ProductStatus status);

    @Query("SELECT p.color FROM Product p WHERE p.category.id = ?1 AND status = ?2")
    List<Color> findColorByCategoryIdAndStatus(Long id, ProductStatus status);

    @Query("SELECT p.size FROM Product p WHERE p.category.id = ?1 AND status = ?2")
    List<Size> findSizeByCategoryIdAndStatus(Long id, ProductStatus status);

    @Query("SELECT p.productType FROM Product p WHERE p.category.id = ?1 AND status = ?2")
    List<ProductType> findProductTypesByCategoryIdAndStatus(Long id, ProductStatus status);

    Product findFirstByCategoryIdAndStatusOrderByPriceAsc(Long id, ProductStatus status);

    Product findFirstByCategoryIdAndStatusOrderByPriceDesc(Long id, ProductStatus status);

    @Query("SELECT p FROM Product p WHERE p.discount > 0 AND status = ?1 order by priceWithDiscount ASC limit 1")
    Product findFirstByDiscountAndStatusOrderByPriceAsc(ProductStatus status);

    @Query("SELECT p FROM Product p WHERE p.discount > 0 AND status = ?1 order by priceWithDiscount DESC limit 1")
    Product findFirstByDiscountAndStatusOrderByPriceDesc(ProductStatus status);

    @Query("SELECT p.color FROM Product p WHERE p.discount > 0 AND status = ?1")
    List<Color> findColorsByDiscountAndStatus(ProductStatus status);

    @Query("SELECT DISTINCT p.color FROM Product p WHERE status = ?1")
    List<Color> findColorsByStatus(ProductStatus status);

    @Query("SELECT p.size FROM Product p WHERE p.discount > 0 AND status = ?1")
    List<Size> findSizesByDiscountAndStatus(ProductStatus status);

    @Query("SELECT p.size FROM Product p WHERE status = ?1")
    List<Size> findSizesByStatus(ProductStatus status);

    @Query("SELECT p.productType FROM Product p WHERE p.discount > 0 AND status = ?1")
    List<ProductType> findProductTypesByDiscountAndStatus(ProductStatus status);

    @Query("SELECT p.productType FROM Product p WHERE status = ?1")
    List<ProductType> findProductTypesByStatus(ProductStatus status);

    @Query("SELECT p.category FROM Product p WHERE p.discount > 0 AND status = ?1")
    List<Category> findCategoriesByDiscountAndStatus(ProductStatus status);

    @Query("SELECT p.category FROM Product p WHERE status = ?1")
    List<Category> findCategoriesByStatus(ProductStatus status);
}
