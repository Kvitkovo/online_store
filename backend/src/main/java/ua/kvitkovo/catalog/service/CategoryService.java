package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.converter.CategoryDtoMapper;
import ua.kvitkovo.catalog.dto.request.CategoryRequestDto;
import ua.kvitkovo.catalog.dto.response.CategoryResponseDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.entity.CategoryStatus;
import ua.kvitkovo.catalog.repository.CategoryRepository;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryDtoMapper categoryMapper;
    private final TransliterateUtils transliterateUtils;

    public Collection<CategoryResponseDto> getAll() {
        List<Category> categories = categoryRepository.findAllByOrderByParentAscSortValueAsc();
        return categoryMapper.mapEntityToDto(categories);
    }

    public CategoryResponseDto findById(long id) throws ItemNotFoundException {
        return categoryRepository.findById(id)
            .map(categoryMapper::mapEntityToDto)
            .orElseThrow(() -> new ItemNotFoundException("Category not found"));
    }

    @Transactional
    public CategoryResponseDto addCategory(CategoryRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        Category category = categoryMapper.mapDtoRequestToEntity(dto);
        category.setAlias(
            transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        if (dto.getParentId() > 0) {
            category.setParent(categoryMapper.mapDtoToEntity(findById(dto.getParentId())));
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
        return categoryMapper.mapEntityToDto(category);
    }

    @Transactional
    public void deleteCategory(long id) {
        CategoryResponseDto categoryResponseDto = findById(id);
        categoryRepository.deleteById(categoryResponseDto.getId());
    }

    @Transactional
    public CategoryResponseDto updateCategory(Long id, CategoryRequestDto dto,
        BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);

        CategoryResponseDto categoryResponseDto = findById(id);
        if (!Objects.equals(dto.getName(), categoryResponseDto.getName())) {
            categoryResponseDto.setAlias(
                transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, categoryResponseDto, Helper.getNullPropertyNames(dto));

        if (dto.getParentId() == 0) {
            categoryResponseDto.setParent(null);
        } else {
            categoryResponseDto.setParent(findById(dto.getParentId()));
        }

        Category category = categoryMapper.mapDtoToEntity(categoryResponseDto);
        categoryRepository.save(category);
        return categoryMapper.mapEntityToDto(category);
    }
}
