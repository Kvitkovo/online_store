package ua.kvitkovo.decor.controller;

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.annotations.ApiResponseBadRequest;
import ua.kvitkovo.annotations.ApiResponseForbidden;
import ua.kvitkovo.annotations.ApiResponseNotFound;
import ua.kvitkovo.annotations.ApiResponseSuccessful;
import ua.kvitkovo.annotations.ApiResponseUnauthorized;
import ua.kvitkovo.decor.converter.DecorDtoMapper;
import ua.kvitkovo.decor.dto.DecorRequestDto;
import ua.kvitkovo.decor.dto.DecorResponseDto;
import ua.kvitkovo.decor.dto.DecorUpdateRequestDto;
import ua.kvitkovo.decor.entity.Decor;
import ua.kvitkovo.decor.entity.DecorStatus;
import ua.kvitkovo.decor.service.DecorService;

import java.util.List;

@Tag(name = "Decor", description = "the decor orders API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/decor")
public class DecorController {

    private final DecorService decorService;
    private final DecorDtoMapper decorDtoMapper;


    @Operation(summary = "Get Decor order by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = DecorResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/{id}")
    public DecorResponseDto getDecorOrderById(
            @Parameter(description = "The ID of the decor order to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to get the Decor with id - {}.", id);
        Decor decor = decorService.findById(id);
        log.debug("the Decor with id - {} was retrieved - {}.", id, decor);
        return decorDtoMapper.mapEntityToDto(decor);
    }

    @Operation(summary = "Get all Decor orders")
    @ApiResponseSuccessful
    @GetMapping
    public Page<DecorResponseDto> getAllDecorOrders(
            @Parameter(description = "Number of page (1..N)", required = true,
                    schema = @Schema(type = "integer", defaultValue = "1")
            ) @RequestParam(defaultValue = "1") int page,
            @Parameter(description = "The size of the page to be returned", required = true,
                    schema = @Schema(type = "integer", defaultValue = "12")
            ) @RequestParam(defaultValue = "12") int size,
            @Parameter(description = "Sort direction (ASC, DESC)",
                    schema = @Schema(type = "string")
            ) @RequestParam(required = false, defaultValue = "ASC") String sortDirection
    ) {
        log.debug("Received request to get all Decor Orders.");
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
                "created");
        Page<Decor> decors = decorService.getAllDecorOrders(pageable);
        return decors.map(decorDtoMapper::mapEntityToDto);
    }

    @Operation(summary = "Add a new Decor order")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = DecorResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PostMapping
    public DecorResponseDto addDecor(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final DecorRequestDto request,
            BindingResult bindingResult) {
        log.debug("Received request to create Decor order - {}.", request);
        Decor decor = decorService.addDecor(request, bindingResult);
        return decorDtoMapper.mapEntityToDto(decor);
    }

    @Operation(summary = "Set Decor order status")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(
                    mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = DecorResponseDto.class))
            )
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{decorOrdersID}/setStatus")
    public List<DecorResponseDto> setDecorOrdersStatus(@PathVariable List<Long> decorOrdersID,
                                                       @RequestParam DecorStatus status) {
        log.info("Received request to set Decor orders with ids {} status {}.", decorOrdersID,
                status);
        List<Decor> decors = decorService.updateDecorStatus(decorOrdersID, status);
        return decorDtoMapper.mapEntityToDto(decors);
    }

    @Operation(summary = "Update Decor Order by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = DecorResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{id}")
    public DecorResponseDto updateDecorOrder(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final DecorUpdateRequestDto request,
            @Parameter(description = "The ID of the order to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.info("Received request to update Decor Order - {} with id {}.", request, id);
        Decor decor = decorService.updateDecorOrder(id, request, bindingResult);
        return decorDtoMapper.mapEntityToDto(decor);
    }
}
