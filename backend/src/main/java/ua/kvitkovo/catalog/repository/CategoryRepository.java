package ua.kvitkovo.catalog.repository;

import org.springframework.stereotype.Repository;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.entity.CategoryStatus;

import java.util.List;

@Repository
public interface CategoryRepository extends CategoryRepositoryBasic {

    List<Category> findAllByParent(Category parent);

    List<Category> findAllByStatusOrderByParentAscSortValueAsc(CategoryStatus status);
}
