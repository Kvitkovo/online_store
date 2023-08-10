package ua.kvitkovo.catalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.kvitkovo.catalog.entity.ProductType;

/**
 * @author Andriy Gaponov
 */
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {

}
