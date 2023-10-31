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
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.catalog.dto.request.FilterRequestDto;
import ua.kvitkovo.catalog.dto.request.ProductRequestDto;
import ua.kvitkovo.catalog.dto.response.ProductResponseDto;
import ua.kvitkovo.catalog.dto.response.ProductResponseForCardDto;
import ua.kvitkovo.catalog.repository.ProductRepository;
import ua.kvitkovo.catalog.service.ProductService;
import ua.kvitkovo.errorhandling.ErrorResponse;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Products", description = "the products API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/products")
public class ProductController {

    private final ProductRepository productRepository;

    private final ProductService productService;

    @Operation(summary = "Get all Products.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(
                mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = ProductResponseDto.class))
            )
        })
    })
    @GetMapping
    @ResponseBody
    public ResponseEntity<Collection<ProductResponseDto>> getAll() {
        log.debug("Received request to get all Products.");
        Collection<ProductResponseDto> productResponseDtos = productService.getAll();
        if (productResponseDtos.isEmpty()) {
            log.debug("Products are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.debug("All Products were retrieved - {}.", productResponseDtos);
        return ResponseEntity.ok().body(productResponseDtos);
    }

    @Operation(summary = "Get Product by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                @Content(mediaType = "application/json", schema =
                @Schema(implementation = ProductResponseForCardDto.class))
        }),
            @ApiResponse(responseCode = "404", description = "Product not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public ProductResponseForCardDto getProductById(
            @Parameter(description = "The ID of the product to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to get the Product with id - {}.", id);
        ProductResponseForCardDto productResponseDto = productService.findById(id);
        log.debug("the Product with id - {} was retrieved - {}.", id, productResponseDto);
        return productResponseDto;
    }

    @Operation(summary = "Get discounted products")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping(path = "/discounted")
    public Page<ProductResponseDto> getDiscountedProducts(
        @Parameter(description = "Number of page (1..N)", required = true,
            schema = @Schema(type = "integer", defaultValue = "1")
        ) @RequestParam(defaultValue = "1") int page,
        @Parameter(description = "The size of the page to be returned", required = true,
            schema = @Schema(type = "integer", defaultValue = "12")
        ) @RequestParam(defaultValue = "12") int size,
        @Parameter(description = "Sort direction (ASC, DESC)",
            schema = @Schema(type = "string")
        ) @RequestParam(required = false, defaultValue = "ASC") String sortDirection) {
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
            "priceWithDiscount");
        return productService.getDiscounted(pageable);
    }

    @Operation(summary = "Get Products by Category ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping(path = "/category")
    public Page<ProductResponseDto> getAllProductsByCategory(
        @Parameter(description = "Number of page (1..N)", required = true,
            schema = @Schema(type = "integer", defaultValue = "1")
        ) @RequestParam(defaultValue = "1") int page,
        @Parameter(description = "The size of the page to be returned", required = true,
            schema = @Schema(type = "integer", defaultValue = "12")
        ) @RequestParam(defaultValue = "12") int size,
        @Parameter(description = "ID of the category of which the products will be returned", required = true,
            schema = @Schema(type = "integer")
        ) @RequestParam long categoryId,
        @Parameter(description = "Sort direction (ASC, DESC)",
            schema = @Schema(type = "string")
        ) @RequestParam(required = false, defaultValue = "ASC") String sortDirection) {
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
            "priceWithDiscount");
        return productService.getAllByCategory(pageable, categoryId);
    }

    @Operation(summary = "Get Products by filter")
    @ApiResponse(responseCode = "200", description = "Successful operation")
    @GetMapping(path = "/filter")
    public Page<ProductResponseDto> getAllProductsByFilter(
        @Parameter(description = "Number of page (1..N)", required = true,
            schema = @Schema(type = "integer", defaultValue = "1")
        ) @RequestParam(defaultValue = "1") int page,
        @Parameter(description = "The size of the page to be returned", required = true,
            schema = @Schema(type = "integer", defaultValue = "30")
        ) @RequestParam(defaultValue = "30") int size,
        @Parameter(description = "Get products whose price is equal to or higher than the specified price",
            schema = @Schema(type = "integer", defaultValue = "0")
        ) @RequestParam(required = false, defaultValue = "0")
        @Min(value = 0, message = "priceFrom should not be less than 0") Integer priceFrom,
        @Parameter(description = "Get products whose price is equal to or less than the specified price",
            schema = @Schema(type = "integer", defaultValue = "5000")
        ) @RequestParam(required = false, defaultValue = "5000")
        @Min(value = 0, message = "priceTo should not be less than 0") Integer priceTo,
        @Parameter(description = "Get products whose name is similar to the specified term",
            schema = @Schema(type = "string")
        ) @RequestParam(required = false) String title,
        @Parameter(description = "ID of the category of which the products will be returned",
            schema = @Schema(type = "integer")
        ) @RequestParam(required = false)
        @Min(value = 1, message = "categoryId should not be less than 1") Long categoryId,
        @Parameter(description = "List of color identifiers",
            schema = @Schema(type = "array[integer]")
        ) @RequestParam(required = false) List<Long> colors,
        @Parameter(description = "List of sizes identifiers",
            schema = @Schema(type = "array[integer]")
        ) @RequestParam(required = false) List<Long> sizes,
        @Parameter(description = "List of product types identifiers",
            schema = @Schema(type = "array[integer]")
        ) @RequestParam(required = false) List<Long> types,
        @Parameter(description = "Promotional product",
            schema = @Schema(type = "boolean")
        ) @RequestParam(required = false) Boolean discount,
        @Parameter(description = "Sort direction (ASC, DESC)",
            schema = @Schema(type = "string")
        ) @RequestParam(required = false, defaultValue = "ASC") String sortDirection) {
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
            "priceWithDiscount");
        FilterRequestDto filter = FilterRequestDto.builder()
            .priceFrom(priceFrom)
            .priceTo(priceTo)
            .title(title)
            .categoryId(categoryId)
            .colors(colors)
            .sizes(sizes)
            .productTypes(types)
            .discount(discount)
            .build();
        return productService.getAllByFilter(filter, pageable);
    }

    @Operation(summary = "Create a new Product")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ProductResponseDto.class))
        }),
        @ApiResponse(responseCode = "400", description = "The Product has already been added " +
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
        @ApiResponse(responseCode = "404", description = "Some dependencies were not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PostMapping
    @ResponseBody
    public ProductResponseDto addProduct(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ProductRequestDto request,
        BindingResult bindingResult) {
        log.debug("Received request to create Product - {}.", request);
        return productService.addProduct(request, bindingResult);
    }

    @Operation(summary = "Update Product by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ProductResponseDto.class))
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
        @ApiResponse(responseCode = "404", description = "Product or some dependencies not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{id}")
    @ResponseBody
    public ProductResponseDto updateProduct(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ProductRequestDto request,
        @Parameter(description = "The ID of the product to update", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update Product - {} with id {}.", request, id);
        return productService.updateProduct(id, request, bindingResult);
    }

    @Operation(summary = "Delete Product by ID")
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
        @ApiResponse(responseCode = "404", description = "Product not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteProduct(
        @Parameter(description = "The ID of the product to delete", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id) {
        log.debug("Received request to delete Product with id - {}.", id);
        productService.deleteProduct(id);
        log.debug("the Product with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Enable Product by ID")
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
        @ApiResponse(responseCode = "404", description = "Product not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{id}/enable")
    @ResponseBody
    public ProductResponseDto enableProduct(
        @Parameter(description = "The ID of the product to enable", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id) {
        log.debug("Received request to enable Product with id {}.", id);
        return productService.enableProduct(id);
    }

    @Operation(summary = "Disable Product by ID")
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
        @ApiResponse(responseCode = "404", description = "Product not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{id}/disable")
    @ResponseBody
    public ProductResponseDto disableProduct(
        @Parameter(description = "The ID of the product to disable", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id) {
        log.debug("Received request to disable Product with id {}.", id);
        return productService.disableProduct(id);
    }
}
