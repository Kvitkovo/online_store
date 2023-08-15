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
import ua.kvitkovo.catalog.dto.ColorRequestDto;
import ua.kvitkovo.catalog.dto.ColorResponseDto;
import ua.kvitkovo.catalog.service.ColorService;
import ua.kvitkovo.errorhandling.ErrorResponse;

import java.util.Collection;
import java.util.Collections;

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

    @Operation(summary = "Get all Colors.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = ColorResponseDto.class))
                    )
            })
    })
    @GetMapping
    @ResponseBody
    public ResponseEntity<Collection<ColorResponseDto>> getAll() {
        log.info("Received request to get all Colors.");
        Collection<ColorResponseDto> colorResponseDtos = colorService.getAll();
        if (colorResponseDtos.isEmpty()) {
            log.info("Colors are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.info("All Colors were retrieved - {}.", colorResponseDtos);
        return ResponseEntity.ok().body(colorResponseDtos);
    }

    @Operation(summary = "Get Color by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ColorResponseDto.class))
            }),
            @ApiResponse(responseCode = "404", description = "Color not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public ColorResponseDto getColorById(
            @Parameter(description = "The ID of the color to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.info("Received request to get the Color with id - {}.", id);
        ColorResponseDto colorResponseDto = colorService.findById(id);
        log.info("the Color with id - {} was retrieved - {}.", id, colorResponseDto);
        return colorResponseDto;
    }

    @Operation(summary = "Get Color by Name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ColorResponseDto.class))
            }),
            @ApiResponse(responseCode = "404", description = "Color not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/findByName/{name}")
    @ResponseBody
    public ColorResponseDto getColorByName(
            @Parameter(description = "The name of the color to retrieve", required = true,
                    schema = @Schema(type = "string")
            )
            @PathVariable String name) {
        log.info("Received request to get the Color with name - {}.", name);
        ColorResponseDto colorResponseDto = colorService.findByName(name);
        log.info("the Color with name - {} was retrieved - {}.", name, colorResponseDto);
        return colorResponseDto;
    }

    @Operation(summary = "Create a new Color")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ColorResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Color has already been added " +
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
            }),
            @ApiResponse(responseCode = "404", description = "Color not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @PostMapping
    @ResponseBody
    public ColorResponseDto addColor(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ColorRequestDto request, BindingResult bindingResult) {
        log.info("Received request to create Color - {}.", request);
        return colorService.addColor(request, bindingResult);
    }

    @Operation(summary = "Update Color by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ColorResponseDto.class))
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
            @ApiResponse(responseCode = "404", description = "Color not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @PutMapping("/{id}")
    @ResponseBody
    public ColorResponseDto updateColor(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final ColorRequestDto request,
            @Parameter(description = "The ID of the color to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.info("Received request to update Color - {} with id {}.", request, id);
        return colorService.updateColor(id, request, bindingResult);
    }

    @Operation(summary = "Delete Color by ID")
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
            @ApiResponse(responseCode = "404", description = "Color not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteColor(
            @Parameter(description = "The ID of the color to delete", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.info("Received request to delete Color with id - {}.", id);
        colorService.deleteColor(id);
        log.info("the Color with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
