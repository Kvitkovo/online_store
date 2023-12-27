package ua.kvitkovo.data;

import ua.kvitkovo.catalog.controller.CategoryController;
import ua.kvitkovo.catalog.dto.response.CategoryResponseDto;
import ua.kvitkovo.catalog.entity.Category;

public class CategoryTestData {

    public static final String URL = CategoryController.REST_URL;

    public static final Category CATEGORY = Category.builder()
        .id(1L)
        .name("Test category")
        .alias("test_category")
        .build();
    public static final CategoryResponseDto CATEGORY_RESPONSE_DTO = CategoryResponseDto.builder()
        .id(1L)
        .name("Test category")
        .alias("test_category")
        .build();
}
