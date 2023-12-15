package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.dto.request.CategoryRequestDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.entity.CategoryStatus;
import ua.kvitkovo.catalog.repository.CategoryRepository;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

import java.util.List;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    private final TransliterateUtils transliterateUtils;

    public List<Category> getAll() {
        return categoryRepository.findAllByOrderByParentAscSortValueAsc();
    }

    public List<Category> findAllByParent(Category category) {
        return categoryRepository.findAllByParent(category);
    }

    public Category findById(long id) throws ItemNotFoundException {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Category not found"));
    }

    @Transactional
    public Category addCategory(CategoryRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        Category category = new Category();
        BeanUtils.copyProperties(dto, category);
        category.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        if (dto.getParentId() > 0) {
            category.setParent(findById(dto.getParentId()));
        }
        if (dto.getMetaDescription() == null) {
            dto.setMetaDescription("");
        }
        if (dto.getMetaKeywords() == null) {
            dto.setMetaKeywords("");
        }
        if (dto.getStatus() == null) {
            dto.setStatus(CategoryStatus.ACTIVE);
        }
        category.setId(null);
        categoryRepository.save(category);
        log.info("The Category was created");
        return category;
    }

    @Transactional
    public void deleteCategory(long id) {
        Category category = findById(id);
        categoryRepository.delete(category);
    }

    @Transactional
    public Category updateCategory(Long id, CategoryRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);
        Category category = findById(id);
        if (!Objects.equals(dto.getName(), category.getName())) {
            category.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, category, Helper.getNullPropertyNames(dto));

        if (dto.getParentId() == 0) {
            category.setParent(null);
        } else {
            category.setParent(findById(dto.getParentId()));
        }

        categoryRepository.save(category);
        return category;
    }
}
