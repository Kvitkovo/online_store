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
import ua.kvitkovo.catalog.converter.ProductTypeDtoMapper;
import ua.kvitkovo.catalog.dto.request.ProductTypeRequestDto;
import ua.kvitkovo.catalog.dto.response.ProductTypeResponseDto;
import ua.kvitkovo.catalog.entity.ProductType;
import ua.kvitkovo.catalog.service.ProductTypeService;
import ua.kvitkovo.utils.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "Products types", description = "the product types API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/types")
public class ProductTypeController {

    private final ProductTypeService productTypeService;
    private final ProductTypeDtoMapper productTypeDtoMapper;

    @Operation(summary = "Get all Product types.")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(
                    mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = ProductTypeResponseDto.class))
            )
    })
    @GetMapping
    public ResponseEntity<List<ProductTypeResponseDto>> getAll() {
        log.debug("Received request to get all Product types.");
        List<ProductType> typeResponseDtos = productTypeService.getAll();
        if (typeResponseDtos.isEmpty()) {
            log.debug("Product types are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.debug("All Product types were retrieved - {}.", typeResponseDtos);
        return ResponseEntity.ok().body(productTypeDtoMapper.mapEntityToDto(typeResponseDtos));
    }

    @Operation(summary = "Get Product type by ID")

    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ProductTypeResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/{id}")
    public ProductTypeResponseDto getProductTypeById(
            @Parameter(description = "The ID of the product type to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to get the Product type with id - {}.", id);
        ProductType productType = productTypeService.findById(id);
        log.debug("the Product type with id - {} was retrieved - {}.", id, productType);
        return productTypeDtoMapper.mapEntityToDto(productType);
    }

    @Operation(summary = "Create a new Product type")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ProductTypeResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @PostMapping
    public ProductTypeResponseDto addProductType(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ProductTypeRequestDto request,
            BindingResult bindingResult) {
        log.debug("Received request to create Product type - {}.", request);
        ProductType type = productTypeService.addProductType(request, bindingResult);
        return productTypeDtoMapper.mapEntityToDto(type);
    }

    @Operation(summary = "Update Product type by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ProductTypeResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{id}")
    public ProductTypeResponseDto updateProductType(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ProductTypeRequestDto request,
            @Parameter(description = "The ID of the product type to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update Product type - {} with id {}.", request, id);
        ProductType type = productTypeService.updateProductType(id, request, bindingResult);
        return productTypeDtoMapper.mapEntityToDto(type);
    }

    @Operation(summary = "Delete Product type by ID")
    @ApiResponseSuccessful
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @DeleteMapping("/{id}")
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
