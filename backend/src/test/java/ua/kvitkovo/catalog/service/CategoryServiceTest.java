package ua.kvitkovo.catalog.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static ua.kvitkovo.data.CategoryTestData.CATEGORY;

import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.repository.CategoryRepository;
import ua.kvitkovo.utils.TransliterateUtils;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private TransliterateUtils transliterateUtils;

    @InjectMocks
    private CategoryService categoryService;

    @Test
    void findById() {
        Mockito.when(categoryRepository.findById(CATEGORY.getId()))
            .thenReturn(Optional.of(CATEGORY));

        Category actual = categoryService.findById(CATEGORY.getId());
        assertEquals(CATEGORY, actual);
    }
}