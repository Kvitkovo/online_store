package ua.kvitkovo.orders.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
import org.springframework.web.bind.annotation.RestController;
import ua.kvitkovo.annotations.ApiResponseBadRequest;
import ua.kvitkovo.annotations.ApiResponseForbidden;
import ua.kvitkovo.annotations.ApiResponseNotFound;
import ua.kvitkovo.annotations.ApiResponseSuccessful;
import ua.kvitkovo.annotations.ApiResponseUnauthorized;
import ua.kvitkovo.annotations.ParameterPageNumber;
import ua.kvitkovo.annotations.ParameterPageSize;
import ua.kvitkovo.annotations.ParameterPageSort;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.dto.admin.OrderAdminRequestDto;
import ua.kvitkovo.orders.dto.admin.OrderAdminResponseDto;
import ua.kvitkovo.orders.entity.OrderStatus;
import ua.kvitkovo.orders.service.OrderService;

@Tag(name = "Orders", description = "the orders API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/orders")
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "Get Order by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = OrderResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/{id}")
    public OrderResponseDto getOrderById(
        @PathVariable Long id) {
        log.debug("Received request to get the Color with id - {}.", id);
        OrderResponseDto orderResponseDto = orderService.findById(id);
        log.debug("the Order with id - {} was retrieved - {}.", id, orderResponseDto);
        return orderResponseDto;
    }

    @Operation(summary = "Get Order by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = OrderAdminResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/{id}/admin")
    public OrderAdminResponseDto getOrderByIdForAdmin(
        @PathVariable Long id) {
        log.debug("Received request to get the Color with id - {}.", id);
        OrderAdminResponseDto orderResponseDto = orderService.findByIdForAdmin(id);
        log.debug("the Order with id - {} was retrieved - {}.", id, orderResponseDto);
        return orderResponseDto;
    }

    @Operation(summary = "Get Orders for current user.")
    @ApiResponseSuccessful
    @GetMapping(path = "/user/current")
    public Page<OrderResponseDto> getAllOrdersForCurrentUser(
        @ParameterPageNumber @RequestParam(defaultValue = "1") int page,
        @ParameterPageSize @RequestParam(defaultValue = "12") int size,
        @ParameterPageSort @RequestParam(required = false, defaultValue = "ASC") String sortDirection
    ) {
        log.debug("Received request to get current user Orders.");
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
            "created");
        return orderService.getActiveOrdersForCurrentUser(pageable);
    }

    @Operation(summary = "Get all orders")
    @ApiResponseSuccessful
    @GetMapping
    public Page<OrderResponseDto> getAllOrders(
        @ParameterPageNumber @RequestParam(defaultValue = "1") int page,
        @ParameterPageSize @RequestParam(defaultValue = "12") int size,
        @ParameterPageSort @RequestParam(required = false, defaultValue = "ASC") String sortDirection
    ) {
        log.debug("Received request to get all Orders.");
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
            "created");
        return orderService.getAllOrders(pageable);
    }

    @Operation(summary = "Get Orders for user.")
    @ApiResponseSuccessful
    @GetMapping(path = "/user/{id}")
    public Page<OrderResponseDto> getAllOrdersForUser(
        @ParameterPageNumber @RequestParam(defaultValue = "1") int page,
        @ParameterPageSize @RequestParam(defaultValue = "12") int size,
        @ParameterPageSort @RequestParam(required = false, defaultValue = "ASC") String sortDirection,
        @PathVariable Long id
    ) {
        log.debug("Received request to get user with ID {} Orders.", id);
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection),
            "created");
        return orderService.getAllOrdersForUser(pageable, id);
    }

    @Operation(summary = "Add a new Order")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = OrderResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PostMapping
    public OrderResponseDto addOrder(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final OrderRequestDto request,
        BindingResult bindingResult) {
        log.debug("Received request to create Order - {}.", request);
        return orderService.addOrder(request, bindingResult);
    }

    @Operation(summary = "Set orders status")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(
            mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = OrderResponseDto.class))
        )
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{ordersID}/setStatus")
    public List<OrderResponseDto> setOrdersStatus(@PathVariable List<Long> ordersID,
        @RequestParam OrderStatus status) {
        log.debug("Received request to set Orders with ids {} status {}.", ordersID, status);
        return orderService.updateOrdersStatus(ordersID, status);
    }

    @Operation(summary = "Cancel order")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = OrderResponseDto.class))
    })
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{id}/cancel")
    public OrderResponseDto cancelOrder(@PathVariable Long id) {
        log.debug("Received request to cancel order with id {} status {}.", id);
        return orderService.cancelOrder(id);
    }

    @Operation(summary = "Update Order by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = OrderResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{id}")
    public OrderResponseDto updateOrder(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final OrderAdminRequestDto request,
        @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update Order - {} with id {}.", request, id);
        return orderService.updateOrder(id, request, bindingResult);
    }
}
