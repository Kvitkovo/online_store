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
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.products.dto.ProductRequestDto;
import ua.kvitkovo.products.dto.ProductResponseDto;
import ua.kvitkovo.products.service.ProductService;

import java.util.Collection;
import java.util.Collections;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Products")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/products")
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "Get all Products.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = ProductResponseDto.class))
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
    public ResponseEntity<Collection<ProductResponseDto>> getAll() {
        log.info("Received request to get all Products.");
        Collection<ProductResponseDto> productResponseDtos = productService.getAll();
        if (productResponseDtos.isEmpty()) {
            log.info("Products are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.info("All Products were retrieved - {}.", productResponseDtos);
        return ResponseEntity.ok().body(productResponseDtos);
    }

    @Operation(summary = "Get Product by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ProductResponseDto.class))
            }),
            @ApiResponse(responseCode = "404", description = "Product not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public ProductResponseDto getProductById(@PathVariable Long id) {
        log.info("Received request to get the Product with id - {}.", id);
        ProductResponseDto productResponseDto = productService.findById(id);
        log.info("the Product with id - {} was retrieved - {}.", id, productResponseDto);
        return productResponseDto;
    }

    @Operation(summary = "Create a new Product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ProductResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Product has already been added " +
                    "or some data is missing", content = {
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
    @Secured({"ROLE_ADMIN"})
    @PostMapping
    @ResponseBody
    public ProductResponseDto addProduct(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ProductRequestDto request, BindingResult bindingResult) {
        log.info("Received request to create Product - {}.", request);
        return productService.addProduct(request, bindingResult);
    }
}
