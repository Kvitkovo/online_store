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
import ua.kvitkovo.catalog.dto.request.ProductTypeRequestDto;
import ua.kvitkovo.catalog.dto.response.ProductTypeResponseDto;
import ua.kvitkovo.catalog.service.ProductTypeService;
import ua.kvitkovo.errorhandling.ErrorResponse;

import java.util.Collection;
import java.util.Collections;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Products types", description = "the product types API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/types")
public class ProductTypeController {

    private final ProductTypeService productTypeService;

    @Operation(summary = "Get all Product types.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = ProductTypeResponseDto.class))
                    )
            })
    })
    @GetMapping
    @ResponseBody
    public ResponseEntity<Collection<ProductTypeResponseDto>> getAll() {
        log.debug("Received request to get all Product types.");
        Collection<ProductTypeResponseDto> productTypeResponseDtos = productTypeService.getAll();
        if (productTypeResponseDtos.isEmpty()) {
            log.debug("Product types are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.debug("All Product types were retrieved - {}.", productTypeResponseDtos);
        return ResponseEntity.ok().body(productTypeResponseDtos);
    }

    @Operation(summary = "Get Product type by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ProductTypeResponseDto.class))
            }),
            @ApiResponse(responseCode = "404", description = "Product type not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public ProductTypeResponseDto getProductTypeById(
            @Parameter(description = "The ID of the product type to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to get the Product type with id - {}.", id);
        ProductTypeResponseDto productTypeResponseDto = productTypeService.findById(id);
        log.debug("the Product type with id - {} was retrieved - {}.", id, productTypeResponseDto);
        return productTypeResponseDto;
    }

    @Operation(summary = "Create a new Product type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ProductTypeResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Product type has already been added " +
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
            })
    })
    @PostMapping
    @ResponseBody
    public ProductTypeResponseDto addProductType(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ProductTypeRequestDto request, BindingResult bindingResult) {
        log.debug("Received request to create Product type - {}.", request);
        return productTypeService.addProductType(request, bindingResult);
    }

    @Operation(summary = "Update Product type by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ProductTypeResponseDto.class))
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
            @ApiResponse(responseCode = "404", description = "Product type not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @PutMapping("/{id}")
    @ResponseBody
    public ProductTypeResponseDto updateProductType(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ProductTypeRequestDto request,
            @Parameter(description = "The ID of the product type to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update Product type - {} with id {}.", request, id);
        return productTypeService.updateProductType(id, request, bindingResult);
    }

    @Operation(summary = "Delete Product type by ID")
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
            @ApiResponse(responseCode = "404", description = "Product type not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteProductType(
            @Parameter(description = "The ID of the product type to delete", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to delete Product type with id - {}.", id);
        productTypeService.deleteProductType(id);
        log.debug("the Product type with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
