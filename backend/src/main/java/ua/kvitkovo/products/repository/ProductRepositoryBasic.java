package ua.kvitkovo.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.kvitkovo.products.entity.Product;

/**
 * @author Andriy Gaponov
 */
public interface ProductRepositoryBasic extends JpaRepository<Product, Long> {
}
