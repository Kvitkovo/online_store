package ua.kvitkovo.catalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ua.kvitkovo.catalog.entity.Product;

/**
 * @author Andriy Gaponov
 */
public interface ProductRepositoryBasic extends JpaRepository<Product, Long>, JpaSpecificationExecutor {

}
