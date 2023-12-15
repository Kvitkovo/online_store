package ua.kvitkovo.shop.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.shop.converter.ShopDtoMapper;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.shop.dto.ShopResponseDto;
import ua.kvitkovo.shop.entity.Shop;
import ua.kvitkovo.shop.service.ShopService;
import ua.kvitkovo.annotations.ApiResponseBadRequest;
import ua.kvitkovo.annotations.ApiResponseForbidden;
import ua.kvitkovo.annotations.ApiResponseNotFound;
import ua.kvitkovo.annotations.ApiResponseUnauthorized;

@Tag(name = "Shops", description = "the shop API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/shops")
public class ShopController {

    private final ShopService shopService;
    private final ShopDtoMapper shopMapper;

    @Operation(summary = "Get Shop by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ShopResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/{id}")
    public ShopResponseDto getShopById(
            @Parameter(description = "The ID of the shop to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to get the Shop with id - {}.", id);
        Shop shop = shopService.findById(id);
        log.debug("the Shop with id - {} was retrieved - {}.", id, shop);
        return shopMapper.mapEntityToDto(shop);
    }

    @Operation(summary = "Create a new Shop")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ShopResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @PostMapping
    public ShopResponseDto addShop(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ShopRequestDto request,
            BindingResult bindingResult) {
        log.debug("Received request to create Shop - {}.", request);
        Shop shop = shopService.addShop(request, bindingResult);
        return shopMapper.mapEntityToDto(shop);
    }

    @Operation(summary = "Update Shop by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ShopResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @PutMapping("/{id}")
    public ShopResponseDto updateCategory(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ShopRequestDto request,
            @Parameter(description = "The ID of the shop to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update Shop - {} with id {}.", request, id);
        Shop shop = shopService.updateShop(id, request, bindingResult);
        return shopMapper.mapEntityToDto(shop);
    }
}
