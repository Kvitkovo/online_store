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
import ua.kvitkovo.catalog.converter.SizeDtoMapper;
import ua.kvitkovo.catalog.dto.request.SizeRequestDto;
import ua.kvitkovo.catalog.dto.response.SizeResponseDto;
import ua.kvitkovo.catalog.entity.Size;
import ua.kvitkovo.catalog.service.SizeService;

import java.util.Collections;
import java.util.List;

@Tag(name = "Sizes", description = "the sizes API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/sizes")
public class SizeController {

    private final SizeService sizeService;
    private final SizeDtoMapper sizeDtoMapper;

    @Operation(summary = "Get all Sizes.")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(
                    mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = SizeResponseDto.class))
            )
    })
    @GetMapping
    public ResponseEntity<List<SizeResponseDto>> getAll() {
        log.debug("Received request to get all Sizes.");
        List<Size> sizes = sizeService.getAll();
        if (sizes.isEmpty()) {
            log.debug("Sizes are absent.");
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        log.debug("All Sizes were retrieved - {}.", sizes);
        return ResponseEntity.ok().body(sizeDtoMapper.mapEntityToDto(sizes));
    }

    @Operation(summary = "Get Size by ID")

    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = SizeResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/{id}")
    public SizeResponseDto getSizeById(
            @Parameter(description = "The ID of the size to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to get the Size with id - {}.", id);
        Size size = sizeService.findById(id);
        log.debug("the Size with id - {} was retrieved - {}.", id, size);
        return sizeDtoMapper.mapEntityToDto(size);
    }

    @Operation(summary = "Create a new Size")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = SizeResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @PostMapping
    public SizeResponseDto addSize(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final SizeRequestDto request,
            BindingResult bindingResult) {
        log.debug("Received request to create Size - {}.", request);
        Size size = sizeService.addSize(request, bindingResult);
        return sizeDtoMapper.mapEntityToDto(size);
    }

    @Operation(summary = "Update Size by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = SizeResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{id}")
    public SizeResponseDto updateSize(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final SizeRequestDto request,
            @Parameter(description = "The ID of the size to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update Size - {} with id {}.", request, id);
        Size size = sizeService.updateSize(id, request, bindingResult);
        return sizeDtoMapper.mapEntityToDto(size);
    }

    @Operation(summary = "Delete Size by ID")
    @ApiResponseSuccessful
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSize(
            @Parameter(description = "The ID of the size to delete", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to delete Size with id - {}.", id);
        sizeService.deleteSize(id);
        log.debug("the Size with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
