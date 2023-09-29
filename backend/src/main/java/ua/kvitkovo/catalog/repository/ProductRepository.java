package ua.kvitkovo.catalog.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.catalog.entity.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author Andriy Gaponov
 */
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

    List<Product> findAllByIdIn(List<Long> id);
}
