package ua.kvitkovo.catalog.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.catalog.entity.Color;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.catalog.entity.ProductStatus;

import java.math.BigDecimal;
import ua.kvitkovo.catalog.entity.ProductType;
import ua.kvitkovo.catalog.entity.Size;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface ProductRepository extends ProductRepositoryBasic {

    Page<Product> findAllByCategoryIdAndStatusEquals(Pageable pageable, Long id, ProductStatus status);

    Page<Product> findAllByDiscountGreaterThanAndStatusEquals(Pageable pageable, BigDecimal discount, ProductStatus status);

    @Query("SELECT p.color FROM Product p WHERE p.category.id = ?1 AND status = ?2")
    List<Color> findColorByCategoryIdAndStatus(Long id, ProductStatus status);

    @Query("SELECT p.size FROM Product p WHERE p.category.id = ?1 AND status = ?2")
    List<Size> findSizeByCategoryIdAndStatus(Long id, ProductStatus status);

    @Query("SELECT p.productType FROM Product p WHERE p.category.id = ?1 AND status = ?2")
    List<ProductType> findProductTypesByCategoryIdAndStatus(Long id, ProductStatus status);
}
