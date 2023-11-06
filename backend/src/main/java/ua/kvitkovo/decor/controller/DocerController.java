package ua.kvitkovo.decor.controller;

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
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ua.kvitkovo.decor.dto.DecorRequestDto;
import ua.kvitkovo.decor.dto.DecorResponseDto;
import ua.kvitkovo.decor.dto.DecorUpdateRequestDto;
import ua.kvitkovo.decor.entity.DecorStatus;
import ua.kvitkovo.decor.service.DecorService;
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.dto.admin.OrderAdminRequestDto;

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

    @Operation(summary = "Get all Decor orders")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping
    @ResponseBody
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
        log.info("Received request to get all Decor Orders.");
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
            "created");
        return decorService.getAllDecorOrders(pageable);
    }

    @Operation(summary = "Add a new Decor order")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = DecorResponseDto.class))
        }),
        @ApiResponse(responseCode = "400", description = "The Decor order has already been added " +
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
        @ApiResponse(responseCode = "404", description = "Some dependencies were not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PostMapping
    @ResponseBody
    public DecorResponseDto addDecor(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final DecorRequestDto request,
        BindingResult bindingResult) {
        log.info("Received request to create Decor order - {}.", request);
        return decorService.addDecor(request, bindingResult);
    }

    @Operation(summary = "Set Decor order status")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(
                mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = DecorResponseDto.class))
            )
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
        @ApiResponse(responseCode = "404", description = "Some decor orders not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{decorOrdersID}/setStatus")
    public List<DecorResponseDto> setDecorOrdersStatus(@PathVariable List<Long> decorOrdersID,
        @RequestParam DecorStatus status) {
        log.info("Received request to set Decor orders with ids {} status {}.", decorOrdersID,
            status);
        return decorService.updateDecorStatus(decorOrdersID, status);
    }

    @Operation(summary = "Update Decor Order by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = DecorResponseDto.class))
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
        @ApiResponse(responseCode = "404", description = "Some dependencies not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{id}")
    @ResponseBody
    public DecorResponseDto updateDecorOrder(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final DecorUpdateRequestDto request,
        @Parameter(description = "The ID of the order to update", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id, BindingResult bindingResult) {
        log.info("Received request to update Decor Order - {} with id {}.", request, id);
        return decorService.updateDecorOrder(id, request, bindingResult);
    }
}
