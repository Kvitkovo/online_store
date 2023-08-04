package ua.kvitkovo.products.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.products.entity.Product;
import ua.kvitkovo.products.entity.ProductStatus;

import java.math.BigDecimal;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface ProductRepository extends ProductRepositoryBasic {

    Page<Product> findAllByCategoryIdAndStatusEquals(Pageable pageable, Long id, ProductStatus status);

    Page<Product> findAllByDiscountGreaterThanAndStatusEquals(Pageable pageable, BigDecimal discount, ProductStatus status);
}
