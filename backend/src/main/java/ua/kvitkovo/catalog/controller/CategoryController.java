package ua.kvitkovo.catalog.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.catalog.dto.request.CategoryRequestDto;
import ua.kvitkovo.catalog.dto.response.CategoryResponseDto;
import ua.kvitkovo.catalog.service.CategoryService;
import ua.kvitkovo.errorhandling.ErrorResponse;

import java.util.Collection;
import java.util.Collections;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Categories", description = "the category API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "Get all Categories.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = CategoryResponseDto.class))
                    )
            })
    })
    @GetMapping
    @ResponseBody
    public ResponseEntity<Collection<CategoryResponseDto>> getAll() {
        log.debug("Received request to get all Categories.");
        Collection<CategoryResponseDto> categoryResponseDtos = categoryService.getAll();
        if (categoryResponseDtos.isEmpty()) {
            log.debug("All Categories are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.debug("All Categories were retrieved - {}.", categoryResponseDtos);
        return ResponseEntity.ok().body(categoryResponseDtos);
    }

    @Operation(summary = "Get Category by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = CategoryResponseDto.class))
            }),
            @ApiResponse(responseCode = "404", description = "Category not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public CategoryResponseDto getCategoryById(
            @Parameter(description = "The ID of the category to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to get the Category with id - {}.", id);
        CategoryResponseDto categoryResponseDto = categoryService.findById(id);
        log.debug("the Category with id - {} was retrieved - {}.", id, categoryResponseDto);
        return categoryResponseDto;
    }

    @Operation(summary = "Create a new Category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = CategoryResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Category has already been added " +
                    "or some data is missing", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "404", description = "Parent category not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @PostMapping
    @ResponseBody
    public CategoryResponseDto addCategory(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final CategoryRequestDto request, BindingResult bindingResult) {
        log.debug("Received request to create Category - {}.", request);
        return categoryService.addCategory(request, bindingResult);
    }

    @Operation(summary = "Update Category by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = CategoryResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Some data is missing", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "404", description = "Parent category not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @PutMapping("/{id}")
    @ResponseBody
    public CategoryResponseDto updateCategory(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final CategoryRequestDto request,
        @Parameter(description = "The ID of the category to update", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update Category - {} with id {}.", request, id);
        return categoryService.updateCategory(id, request, bindingResult);
    }

    @Operation(summary = "Delete Category by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "404", description = "Category not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @DeleteMapping("/{id}")
    @ResponseBody
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
