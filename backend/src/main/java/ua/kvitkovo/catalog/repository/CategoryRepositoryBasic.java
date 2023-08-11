package ua.kvitkovo.catalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.kvitkovo.catalog.entity.Category;

/**
 * @author Andriy Gaponov
 */
public interface CategoryRepositoryBasic extends JpaRepository<Category, Long> {
}
