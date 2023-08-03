package ua.kvitkovo.products.controller;

import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.products.dto.*;
import ua.kvitkovo.products.service.SizeService;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Sizes")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/sizes")
public class SizeController {

    private final SizeService sizeService;

    @Operation(summary = "Get all Sizes.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = SizeResponseDto.class))
                    )
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
            @ApiResponse(responseCode = "200", description = "OK", content = {
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
    public SizeResponseDto getSizeById(@PathVariable Long id) {
        log.info("Received request to get the Size with id - {}.", id);
        SizeResponseDto sizeResponseDto = sizeService.findById(id);
        log.info("the Size with id - {} was retrieved - {}.", id, sizeResponseDto);
        return sizeResponseDto;
    }

    @Operation(summary = "Create a new Size")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = SizeResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Size has already been added " +
                    "or some data is missing", content = {
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
    @Secured({"ROLE_ADMIN"})
    @PostMapping
    @ResponseBody
    public SizeResponseDto addSize(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final SizeRequestDto request, BindingResult bindingResult) {
        log.info("Received request to create Size - {}.", request);
        return sizeService.addSize(request, bindingResult);
    }

    @Operation(summary = "Update Size by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = SizeResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Some data is missing", content = {
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
    @Secured({"ROLE_ADMIN"})
    @PutMapping("/{id}")
    @ResponseBody
    public SizeResponseDto updateSize(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final SizeRequestDto request, @PathVariable Long id, BindingResult bindingResult) {
        log.info("Received request to update Size - {} with id {}.", request, id);
        return sizeService.updateSize(id, request, bindingResult);
    }

    @Operation(summary = "Delete Size by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "404", description = "Size not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @Secured({"ROLE_ADMIN"})
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteSize(@PathVariable Long id) {
        log.info("Received request to delete Size with id - {}.", id);
        sizeService.deleteSize(id);
        log.info("the Size with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
