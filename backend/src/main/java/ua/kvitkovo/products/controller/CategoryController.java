package ua.kvitkovo.products.controller;

import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.products.dto.CategoryRequestDto;
import ua.kvitkovo.products.dto.CategoryResponseDto;
import ua.kvitkovo.products.service.CategoryService;

import java.util.Collection;
import java.util.Collections;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Categories")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "Get all Categories.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = CategoryResponseDto.class))
                    )
            }),
            @ApiResponse(responseCode = "400", description = "Some data is missing", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping
    @ResponseBody
    public ResponseEntity<Collection<CategoryResponseDto>> getAll() {
        log.info("Received request to get all Categories.");
        Collection<CategoryResponseDto> categoryResponseDtos = categoryService.getAll();
        if (categoryResponseDtos.isEmpty()) {
            log.info("All Categories are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.info("All Categories were retrieved - {}.", categoryResponseDtos);
        return ResponseEntity.ok().body(categoryResponseDtos);
    }

    @Operation(summary = "Get Category by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
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
    public CategoryResponseDto getCategoryById(@PathVariable Long id) {
        log.info("Received request to get the Category with id - {}.", id);
        CategoryResponseDto categoryResponseDto = categoryService.findById(id);
        log.info("the Category with id - {} was retrieved - {}.", id, categoryResponseDto);
        return categoryResponseDto;
    }

    @Operation(summary = "Create a new Category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = CategoryResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Category has already been added " +
                    "or some data is missing", content = {
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
    @Secured({"ROLE_ADMIN"})
    @PostMapping
    @ResponseBody
    public CategoryResponseDto addCategory(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final CategoryRequestDto request, BindingResult bindingResult) {
        log.info("Received request to create Category - {}.", request);
        return categoryService.addCategory(request, bindingResult);
    }

    @Operation(summary = "Update Category by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = CategoryResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Some data is missing", content = {
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
    @Secured({"ROLE_ADMIN"})
    @PutMapping("/{id}")
    @ResponseBody
    public CategoryResponseDto updateCategory(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final CategoryRequestDto request, @PathVariable Long id, BindingResult bindingResult) {
        log.info("Received request to update Category - {} with id {}.", request, id);
        return categoryService.updateCategory(id, request, bindingResult);
    }

    @Operation(summary = "Delete Category by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),

            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "404", description = "Category not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @Secured({"ROLE_ADMIN"})
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        log.info("Received request to deleteCategory the Category with id - {}.", id);
        categoryService.deleteCategory(id);
        log.info("the Category with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
