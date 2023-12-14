package ua.kvitkovo.catalog.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.catalog.converter.CategoryDtoMapper;
import ua.kvitkovo.catalog.dto.request.CategoryRequestDto;
import ua.kvitkovo.catalog.dto.response.CategoryResponseDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.service.CategoryService;
import ua.kvitkovo.utils.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "Categories", description = "the category API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryDtoMapper categoryMapper;

    @Operation(summary = "Get all Categories.")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(
                    mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = CategoryResponseDto.class))
            )
    })
    @ResponseBody
    @GetMapping
    public ResponseEntity<List<CategoryResponseDto>> getAll() {
        log.debug("Received request to get all Categories.");
        List<Category> categories = categoryService.getAll();
        if (categories.isEmpty()) {
            log.debug("All Categories are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.debug("All Categories were retrieved - {}.", categories);
        return ResponseEntity.ok().body(categoryMapper.mapEntityToDto(categories));
    }

    @Operation(summary = "Get Category by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = CategoryResponseDto.class))
    })
    @ApiResponseNotFound
    @ResponseBody
    @GetMapping("/{id}")
    public CategoryResponseDto getCategoryById(
            @Parameter(description = "The ID of the category to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to get the Category with id - {}.", id);
        Category category = categoryService.findById(id);
        log.debug("the Category with id - {} was retrieved - {}.", id, category);
        return categoryMapper.mapEntityToDto(category);
    }

    @Operation(summary = "Create a new Category")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = CategoryResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @ResponseBody
    @PostMapping
    public CategoryResponseDto addCategory(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final CategoryRequestDto request,
            BindingResult bindingResult) {
        log.debug("Received request to create Category - {}.", request);
        Category category = categoryService.addCategory(request, bindingResult);
        return categoryMapper.mapEntityToDto(category);
    }

    @Operation(summary = "Update Category by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = CategoryResponseDto.class))
    })
    @ApiResponseUnauthorized
    @ApiResponseBadRequest
    @ApiResponseForbidden
    @ApiResponseNotFound
    @ResponseBody
    @PutMapping("/{id}")
    public CategoryResponseDto updateCategory(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final CategoryRequestDto request,
            @Parameter(description = "The ID of the category to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update Category - {} with id {}.", request, id);
        Category category = categoryService.updateCategory(id, request, bindingResult);
        return categoryMapper.mapEntityToDto(category);
    }

    @Operation(summary = "Delete Category by ID")
    @ApiResponseSuccessful
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @ResponseBody
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(
            @Parameter(description = "The ID of the category to delete", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to deleteCategory the Category with id - {}.", id);
        categoryService.deleteCategory(id);
        log.debug("the Category with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
