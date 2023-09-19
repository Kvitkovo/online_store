package ua.kvitkovo.orders.controller;

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
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.orders.dto.OrderAdminRequestDto;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.entity.OrderStatus;
import ua.kvitkovo.orders.service.OrderService;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Orders", description = "the orders API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/orders")
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "Get Order by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = OrderResponseDto.class))
        }),
        @ApiResponse(responseCode = "404", description = "Order not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public OrderResponseDto getOrderById(
        @Parameter(description = "The ID of the order to retrieve", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id) {
        log.info("Received request to get the Color with id - {}.", id);
        OrderResponseDto orderResponseDto = orderService.findById(id);
        log.info("the Order with id - {} was retrieved - {}.", id, orderResponseDto);
        return orderResponseDto;
    }

    @Operation(summary = "Get Orders for current user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping(path = "/user/current")
    @ResponseBody
    public Page<OrderResponseDto> getAllOrdersForCurrentUser(

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
        log.info("Received request to get current user Orders.");
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
            "created");
        return orderService.getActiveOrdersForCurrentUser(pageable);
    }

    @Operation(summary = "Get all orders")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping
    @ResponseBody
    public Page<OrderResponseDto> getAllOrders(

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
        log.info("Received request to get all Orders.");
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
            "created");
        return orderService.getAllOrders(pageable);
    }

    @Operation(summary = "Get Orders for user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping(path = "/user/{id}")
    @ResponseBody
    public Page<OrderResponseDto> getAllOrdersForUser(

        @Parameter(description = "Number of page (1..N)", required = true,
            schema = @Schema(type = "integer", defaultValue = "1")
        ) @RequestParam(defaultValue = "1") int page,
        @Parameter(description = "The size of the page to be returned", required = true,
            schema = @Schema(type = "integer", defaultValue = "12")
        ) @RequestParam(defaultValue = "12") int size,
        @Parameter(description = "Sort direction (ASC, DESC)",
            schema = @Schema(type = "string")
        ) @RequestParam(required = false, defaultValue = "ASC") String sortDirection,
        @PathVariable Long id
    ) {
        log.info("Received request to get user with ID {} Orders.", id);
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
            "created");
        return orderService.getAllOrdersForUser(pageable, id);
    }

    @Operation(summary = "Add a new Order")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = OrderResponseDto.class))
        }),
        @ApiResponse(responseCode = "400", description = "The Order has already been added " +
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
    public OrderResponseDto addOrder(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final OrderRequestDto request,
        BindingResult bindingResult) {
        log.info("Received request to create Order - {}.", request);
        return orderService.addOrder(request, bindingResult);
    }

    @Operation(summary = "Set orders status")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(
                mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = OrderResponseDto.class))
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
        @ApiResponse(responseCode = "404", description = "Some orders not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{ordersID}/setStatus")
    public List<OrderResponseDto> setOrdersStatus(@PathVariable List<Long> ordersID,
        @RequestParam OrderStatus status) {
        log.info("Received request to set Orders with ids {} status {}.", ordersID, status);
        return orderService.updateOrdersStatus(ordersID, status);
    }

    @Operation(summary = "Cancel order")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = OrderResponseDto.class))
        }),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        }),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        }),
        @ApiResponse(responseCode = "404", description = "Order not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{id}/cancel")
    public OrderResponseDto cancelOrder(@PathVariable Long id) {
        log.info("Received request to cancel order with id {} status {}.", id);
        return orderService.cancelOrder(id);
    }

    @Operation(summary = "Update Order by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = OrderResponseDto.class))
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
    public OrderResponseDto updateOrder(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final OrderAdminRequestDto request,
        @Parameter(description = "The ID of the order to update", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id, BindingResult bindingResult) {
        log.info("Received request to update Order - {} with id {}.", request, id);
        return orderService.updateOrder(id, request, bindingResult);
    }
}
