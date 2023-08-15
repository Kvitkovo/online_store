package ua.kvitkovo.catalog.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    @GetMapping(path = "/")
    public Map<String, Map<Long, ?>> getFilter() {
        return filterService.getFilter();
    }

}
