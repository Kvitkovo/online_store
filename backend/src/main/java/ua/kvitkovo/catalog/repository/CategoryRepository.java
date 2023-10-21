package ua.kvitkovo.catalog.repository;

import org.springframework.stereotype.Repository;
import ua.kvitkovo.catalog.entity.Category;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface CategoryRepository extends CategoryRepositoryBasic {

    List<Category> findAllByParent(Category parent);

    List<Category> findAllByOrderByParentAscSortValueAsc();
}
