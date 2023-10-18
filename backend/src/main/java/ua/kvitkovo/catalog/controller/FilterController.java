package ua.kvitkovo.catalog.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.catalog.dto.response.FilterPricesIntervalResponseDto;
import ua.kvitkovo.catalog.service.FilterService;

import java.util.Map;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Filter", description = "the filter API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/filter")
public class FilterController {

    private final FilterService filterService;

    @Operation(summary = "Get list for filter settings")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping
    public Map<String, Map<Long, ?>> getFilter() {
        return filterService.getFilter();
    }

    @Operation(summary = "Get a list of filter elements by active products in a category")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping(path = "/category/{id}")
    public Map<String, Map<Long, ?>> getFilterByCategoryId(
        @Parameter(description = "The ID of the category to retrieve", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id) {
        return filterService.getFilterOnlyActiveProductByCategoryId(id);
    }

    @Operation(summary = "Get the minimum and maximum price of goods in the category")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping(path = "/minMaxPrices")
    public FilterPricesIntervalResponseDto getMinMaxPricesInterval(
        @Parameter(description = "ID of the category of which the products will be returned",
            schema = @Schema(type = "integer")
        ) @RequestParam(required = false) Long categoryId
    ){
        return filterService.getMinMaxPricesProductsInCategory(categoryId);
    }
}
