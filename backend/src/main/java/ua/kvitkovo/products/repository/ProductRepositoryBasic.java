package ua.kvitkovo.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ua.kvitkovo.products.entity.Product;

/**
 * @author Andriy Gaponov
 */
public interface ProductRepositoryBasic extends JpaRepository<Product, Long>, JpaSpecificationExecutor {

}
