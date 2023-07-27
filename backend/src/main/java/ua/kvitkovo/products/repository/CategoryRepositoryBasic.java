package ua.kvitkovo.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.kvitkovo.products.entity.Category;

/**
 * @author Andriy Gaponov
 */
public interface CategoryRepositoryBasic extends JpaRepository<Category, Long> {
}
