package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.converter.CategoryMapper;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.catalog.dto.CategoryRequestDto;
import ua.kvitkovo.catalog.dto.CategoryResponseDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.repository.CategoryRepository;
import ua.kvitkovo.catalog.validator.CategoryDefaults;
import ua.kvitkovo.catalog.validator.CategoryDtoValidator;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final CategoryDtoValidator categoryDtoValidator;
    private final CategoryDefaults categoryDefaults;
    private final ErrorUtils errorUtils;
    private final TransliterateUtils transliterateUtils;

    public Collection<CategoryResponseDto> getAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(categoryMapper::convertToDto)
                .toList();
    }

    public CategoryResponseDto findById(long id) throws ItemNotFoundException {
        Optional<Category> optional = categoryRepository.findById(id);
        if (optional.isEmpty()) {
            throw new ItemNotFoundException("Category not found");
        }
        return categoryMapper.convertToDto(optional.get());
    }

    @Transactional
    public CategoryResponseDto addCategory(CategoryRequestDto dto, BindingResult bindingResult) {
        categoryDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        categoryDefaults.fillDefaultValues(dto);
        Category category = categoryMapper.convertToEntity(dto);
        category.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        categoryRepository.save(category);
        log.info("The Category was created");
        return findById(category.getId());
    }

    @Transactional
    public void deleteCategory(long id) {
        CategoryResponseDto categoryResponseDto = findById(id);
        categoryRepository.deleteById(categoryResponseDto.getId());
    }

    @Transactional
    public CategoryResponseDto updateCategory(Long id, CategoryRequestDto dto, BindingResult bindingResult) {
        CategoryResponseDto categoryResponseDto = findById(id);
        if (!Objects.equals(dto.getName(), categoryResponseDto.getName())) {
            categoryResponseDto.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, categoryResponseDto, Helper.getNullPropertyNames(dto));

        if (dto.getParentId() == 0) {
            categoryResponseDto.setParent(null);
        } else {
            categoryResponseDto.setParent(findById(dto.getParentId()));
        }
        Category category = categoryMapper.convertToEntity(categoryResponseDto);
        category.setId(id);

        categoryDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        categoryRepository.save(category);
        return findById(id);
    }
}
