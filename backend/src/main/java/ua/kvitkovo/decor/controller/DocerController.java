package ua.kvitkovo.decor.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.decor.dto.DecorResponseDto;
import ua.kvitkovo.decor.service.DecorService;
import ua.kvitkovo.errorhandling.ErrorResponse;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Decor", description = "the decor orders API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/decor")
public class DocerController {

    private final DecorService decorService;

    @Operation(summary = "Get Decor order by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = DecorResponseDto.class))
            }),
            @ApiResponse(responseCode = "404", description = "Decor order not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public DecorResponseDto getDecorOrderById(
            @Parameter(description = "The ID of the decor order to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.info("Received request to get the Decor with id - {}.", id);
        DecorResponseDto dto = decorService.findById(id);
        log.info("the Decor with id - {} was retrieved - {}.", id, dto);
        return dto;
    }
}
