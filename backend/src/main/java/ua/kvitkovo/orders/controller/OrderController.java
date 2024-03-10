package ua.kvitkovo.orders.controller;

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
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.annotations.*;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.orders.converter.OrderDtoMapper;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.dto.admin.OrderAdminRequestDto;
import ua.kvitkovo.orders.dto.admin.OrderAdminResponseDto;
import ua.kvitkovo.orders.entity.Order;
import ua.kvitkovo.orders.entity.OrderStatus;
import ua.kvitkovo.orders.service.OrderAccessCheckerService;
import ua.kvitkovo.orders.service.OrderPrint;
import ua.kvitkovo.orders.service.OrderService;
import ua.kvitkovo.utils.ErrorUtils;

import java.util.List;

@Tag(name = "Orders", description = "the orders API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/orders")
public class OrderController {

    private static final String SORT_FIELD_NAME = "created";

    private final OrderService orderService;
    private final OrderPrint orderPrint;
    private final OrderDtoMapper orderDtoMapper;
    private final OrderAccessCheckerService accessCheckerService;

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
        Order order = orderService.findById(id);
        accessCheckerService.checkViewAccess(order);
        log.debug("the Order with id - {} was retrieved - {}.", id, order);
        return orderDtoMapper.mapEntityToDto(order);
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
        Order order = orderService.findById(id);
        accessCheckerService.checkViewAccess(order);
        OrderAdminResponseDto dto = orderDtoMapper.mapEntityToDtoForAdmin(order);
        orderService.fillAvailableProduct(dto);
        log.debug("the Order with id - {} was retrieved - {}.", id, order);
        return dto;
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
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection), SORT_FIELD_NAME);
        Page<Order> orders = orderService.getActiveOrdersForCurrentUser(pageable);
        return orders.map(orderDtoMapper::mapEntityToDto);
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
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection), SORT_FIELD_NAME);
        Page<Order> orders = orderService.getAllOrders(pageable);
        return orders.map(orderDtoMapper::mapEntityToDto);
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
        Pageable pageable = PageRequest.of(page - 1, size, Direction.valueOf(sortDirection), SORT_FIELD_NAME);
        Page<Order> orders = orderService.getAllOrdersForUser(pageable, id);
        return orders.map(orderDtoMapper::mapEntityToDto);
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
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(ErrorUtils.getErrorsString(bindingResult));
        }
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
        List<Order> orders = orderService.updateOrdersStatus(ordersID, status);
        accessCheckerService.checkUpdateStatusAccess(orders);
        return orderDtoMapper.mapEntityToDto(orders);
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
        Order order = orderService.cancelOrder(id);
        accessCheckerService.checkUpdateStatusAccess(order);
        return orderDtoMapper.mapEntityToDto(order);
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
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(ErrorUtils.getErrorsString(bindingResult));
        }
        Order order = orderService.findById(id);
        accessCheckerService.checkUpdateAccess(order);
        Order updatedOrder = orderService.updateOrder(order, request, bindingResult);
        return orderDtoMapper.mapEntityToDto(updatedOrder);
    }

    @Operation(summary = "Print order by ID")
    @ApiResponseSuccessful
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @GetMapping("/print/{id}")
    public ResponseEntity<InputStreamResource> printOrder(
            @Parameter(description = "The ID of the order", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to print order with id - {}.", id);
        Order order = orderService.findById(id);
        accessCheckerService.checkUpdateAccess(order);

        InputStreamResource resource = null;
        try {
            resource = orderPrint.printSalesReceipt(order);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=order.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
}
