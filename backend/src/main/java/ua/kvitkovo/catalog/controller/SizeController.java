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
import ua.kvitkovo.catalog.dto.SizeRequestDto;
import ua.kvitkovo.catalog.dto.SizeResponseDto;
import ua.kvitkovo.catalog.service.SizeService;
import ua.kvitkovo.errorhandling.ErrorResponse;

import java.util.Collection;
import java.util.Collections;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Sizes", description = "the sizes API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/sizes")
public class SizeController {

    private final SizeService sizeService;

    @Operation(summary = "Get all Sizes.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = SizeResponseDto.class))
                    )
            })
    })
    @GetMapping
    @ResponseBody
    public ResponseEntity<Collection<SizeResponseDto>> getAll() {
        log.info("Received request to get all Sizes.");
        Collection<SizeResponseDto> sizeResponseDtos = sizeService.getAll();
        if (sizeResponseDtos.isEmpty()) {
            log.info("Sizes are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.info("All Sizes were retrieved - {}.", sizeResponseDtos);
        return ResponseEntity.ok().body(sizeResponseDtos);
    }

    @Operation(summary = "Get Size by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = SizeResponseDto.class))
            }),
            @ApiResponse(responseCode = "404", description = "Size not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public SizeResponseDto getSizeById(
            @Parameter(description = "The ID of the size to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.info("Received request to get the Size with id - {}.", id);
        SizeResponseDto sizeResponseDto = sizeService.findById(id);
        log.info("the Size with id - {} was retrieved - {}.", id, sizeResponseDto);
        return sizeResponseDto;
    }

    @Operation(summary = "Create a new Size")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = SizeResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Size has already been added " +
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
    public SizeResponseDto addSize(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final SizeRequestDto request, BindingResult bindingResult) {
        log.info("Received request to create Size - {}.", request);
        return sizeService.addSize(request, bindingResult);
    }

    @Operation(summary = "Update Size by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = SizeResponseDto.class))
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
            @ApiResponse(responseCode = "404", description = "Size not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @PutMapping("/{id}")
    @ResponseBody
    public SizeResponseDto updateSize(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final SizeRequestDto request,
            @Parameter(description = "The ID of the size to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.info("Received request to update Size - {} with id {}.", request, id);
        return sizeService.updateSize(id, request, bindingResult);
    }

    @Operation(summary = "Delete Size by ID")
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
            @ApiResponse(responseCode = "404", description = "Size not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteSize(
            @Parameter(description = "The ID of the size to delete", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.info("Received request to delete Size with id - {}.", id);
        sizeService.deleteSize(id);
        log.info("the Size with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
