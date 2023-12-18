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
import ua.kvitkovo.annotations.ApiResponseBadRequest;
import ua.kvitkovo.annotations.ApiResponseForbidden;
import ua.kvitkovo.annotations.ApiResponseNotFound;
import ua.kvitkovo.annotations.ApiResponseSuccessful;
import ua.kvitkovo.annotations.ApiResponseUnauthorized;
import ua.kvitkovo.catalog.converter.ColorDtoMapper;
import ua.kvitkovo.catalog.dto.request.ColorRequestDto;
import ua.kvitkovo.catalog.dto.response.ColorResponseDto;
import ua.kvitkovo.catalog.entity.Color;
import ua.kvitkovo.catalog.service.ColorService;

import java.util.Collections;
import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Colors", description = "the colors API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/colors")
public class ColorController {

    private final ColorService colorService;
    private final ColorDtoMapper colorDtoMapper;

    @Operation(summary = "Get all Colors.")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(
                    mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = ColorResponseDto.class))
            )
    })
    @GetMapping
    public ResponseEntity<List<ColorResponseDto>> getAll() {
        log.debug("Received request to get all Colors.");
        List<Color> colors = colorService.getAll();
        if (colors.isEmpty()) {
            log.debug("Colors are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.debug("All Colors were retrieved - {}.", colors);
        return ResponseEntity.ok().body(colorDtoMapper.mapEntityToDto(colors));
    }

    @Operation(summary = "Get Color by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ColorResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/{id}")
    public ColorResponseDto getColorById(
            @Parameter(description = "The ID of the color to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to get the Color with id - {}.", id);
        Color color = colorService.findById(id);
        log.debug("the Color with id - {} was retrieved - {}.", id, color);
        return colorDtoMapper.mapEntityToDto(color);
    }

    @Operation(summary = "Get Color by Name")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ColorResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/findByName/{name}")
    public ColorResponseDto getColorByName(
            @Parameter(description = "The name of the color to retrieve", required = true,
                    schema = @Schema(type = "string")
            )
            @PathVariable String name) {
        log.debug("Received request to get the Color with name - {}.", name);
        Color color = colorService.findByName(name);
        log.debug("the Color with name - {} was retrieved - {}.", name, color);
        return colorDtoMapper.mapEntityToDto(color);
    }

    @Operation(summary = "Create a new Color")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ColorResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PostMapping
    public ColorResponseDto addColor(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ColorRequestDto request, BindingResult bindingResult) {
        log.debug("Received request to create Color - {}.", request);
        Color color = colorService.addColor(request, bindingResult);
        return colorDtoMapper.mapEntityToDto(color);
    }

    @Operation(summary = "Update Color by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ColorResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{id}")
    public ColorResponseDto updateColor(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ColorRequestDto request,
            @Parameter(description = "The ID of the color to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update Color - {} with id {}.", request, id);
        Color color = colorService.updateColor(id, request, bindingResult);
        return colorDtoMapper.mapEntityToDto(color);
    }

    @Operation(summary = "Delete Color by ID")
    @ApiResponseSuccessful
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColor(
            @Parameter(description = "The ID of the color to delete", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to delete Color with id - {}.", id);
        colorService.deleteColor(id);
        log.debug("the Color with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
