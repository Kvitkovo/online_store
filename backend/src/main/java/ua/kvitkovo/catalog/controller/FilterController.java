package ua.kvitkovo.catalog.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.kvitkovo.annotations.ApiResponseSuccessful;
import ua.kvitkovo.catalog.service.FilterService;

import java.util.Map;

@Tag(name = "Filter", description = "the filter API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/filter")
public class FilterController {

    private final FilterService filterService;

    @Operation(summary = "Get list for filter settings")
    @ApiResponseSuccessful
    @GetMapping
    public Map<String, Object> getFilter() {
        return filterService.getFilter();
    }

    @Operation(summary = "Get a list of filter elements by active products in a category")
    @ApiResponseSuccessful
    @GetMapping(path = "/category/{id}")
    public Map<String, Object> getFilterByCategoryId(
            @Parameter(description = "The ID of the category to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        return filterService.getFilterOnlyActiveProductByCategoryId(id);
    }

    @Operation(summary = "Get a list of filter elements by active products with discount")
    @ApiResponseSuccessful
    @GetMapping(path = "/discount")
    public Map<String, Object> getFilterByDiscount() {
        return filterService.getFilterOnlyActiveProductByDiscount();
    }
}
