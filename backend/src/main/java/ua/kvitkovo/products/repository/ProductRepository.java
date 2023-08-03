package ua.kvitkovo.products.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.products.entity.Product;

import java.math.BigDecimal;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface ProductRepository extends ProductRepositoryBasic {

    Page<Product> findAllByCategoryId(Pageable pageable, Long id);
    Page<Product> findAllByDiscountGreaterThan(Pageable pageable, BigDecimal discount);
}
