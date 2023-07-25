package ua.kvitkovo.shop.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.shop.dto.ShopResponseDto;
import ua.kvitkovo.shop.service.ShopService;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Shops")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/shops")
public class ShopController {

    private final ShopService shopService;

    @Operation(summary = "Get Shop by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ShopResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Shop not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public ShopResponseDto getShopById(@PathVariable Long id) {
        log.info("Received request to get the Shop with id - {}.", id);
        ShopResponseDto shopResponseDto = shopService.findById(id);
        log.info("the Shop with id - {} was retrieved - {}.", id, shopResponseDto);
        return shopResponseDto;
    }

    @Operation(summary = "Create a new Shop")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ShopResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Shop has already been added " +
                    "or some data is missing", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @Secured({"ROLE_ADMIN"})
    @PostMapping
    @ResponseBody
    public ShopResponseDto addShop(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ShopRequestDto request, BindingResult bindingResult) {
        log.info("Received request to create Shop - {}.", request);
        return shopService.addShop(request, bindingResult);
    }

    @Operation(summary = "Update Shop by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ShopResponseDto.class))
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
    @Secured({"ROLE_ADMIN"})
    @PutMapping("/{id}")
    @ResponseBody
    public ShopResponseDto updateCategory(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ShopRequestDto request, @PathVariable Long id, BindingResult bindingResult) {
        log.info("Received request to update Shop - {} with id {}.", request, id);
        return shopService.updateShop(id, request, bindingResult);
    }
}
