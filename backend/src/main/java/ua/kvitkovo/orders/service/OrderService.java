package ua.kvitkovo.orders.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.repository.ProductRepository;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.orders.converter.OrderDtoMapper;
import ua.kvitkovo.orders.converter.OrderItemDtoMapper;
import ua.kvitkovo.orders.dto.OrderItemCompositionRequestDto;
import ua.kvitkovo.orders.dto.OrderItemRequestDto;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.entity.Order;
import ua.kvitkovo.orders.entity.OrderItem;
import ua.kvitkovo.orders.entity.OrderItemComposition;
import ua.kvitkovo.orders.entity.OrderStatus;
import ua.kvitkovo.orders.repository.OrderRepository;
import ua.kvitkovo.orders.validator.OrderDtoValidator;
import ua.kvitkovo.shop.repository.ShopRepository;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserService;
import ua.kvitkovo.utils.ErrorUtils;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDtoValidator orderDtoValidator;
    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;
    private final OrderDtoMapper orderDtoMapper;
    private final OrderItemDtoMapper orderItemDtoMapper;
    private final ErrorUtils errorUtils;
    private final UserService userService;
    private final UserDtoMapper userDtoMapper;

    public OrderResponseDto addOrder(OrderRequestDto dto, BindingResult bindingResult) {
        orderDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        Order order = orderDtoMapper.mapDtoRequestToEntity(dto);
        order.setId(null);
        order.setShop(shopRepository.findById(dto.getShopId()).orElseThrow(() -> new ItemNotFoundException("Shop not found")));
        order.setAddress(getFullTextAddress(order));
        order.setStatus(OrderStatus.NEW);

        order.setOrderItems(getOrderItemsFromDtosRequest(order, dto.getOrderItems()));
        order.setTotalSum(calculateTotalSum(order));

        UserResponseDto currentUser = userService.getCurrentUser();
        User customer = userDtoMapper.mapDtoToEntity(currentUser);
        order.setCustomer(customer);

        orderRepository.save(order);
        log.info("The Order was created");
        return orderDtoMapper.mapEntityToDto(order);
    }

    private String getFullTextAddress(Order order) {
        return String.join(", ",
                order.getAddressCity(),
                order.getAddressStreet(),
                order.getAddressHouse(),
                order.getAddressApartment()
        );
    }

    private BigDecimal calculateTotalSum(Order order) {
        BigDecimal totalSum = BigDecimal.ZERO;
        Set<OrderItem> orderItems = order.getOrderItems();
        if (orderItems == null || orderItems.size() == 0) {
            return totalSum;
        }

        for (OrderItem orderItem : orderItems) {
            BigDecimal itemSum = orderItem.getQty().multiply(orderItem.getPrice());
            totalSum = totalSum.add(itemSum);
        }
        return totalSum;
    }

    private Set<OrderItem> getOrderItemsFromDtosRequest(Order order, Set<OrderItemRequestDto> dtoOrderItems) {
        if (dtoOrderItems == null) {
            return null;
        }
        Set<OrderItem> orderItems = new HashSet<>();
        for (OrderItemRequestDto itemRequestDto : dtoOrderItems) {
            OrderItem orderItem = orderItemDtoMapper.mapDtoRequestToEntity(itemRequestDto);
            if (itemRequestDto.getProductId() != null) {
                orderItem.setProduct(
                        productRepository.findById(itemRequestDto.getProductId()).orElseThrow(() -> new ItemNotFoundException("Product not found"))
                );
            } else {
                orderItem.setProduct(null);
            }
            orderItem.setOrder(order);
            orderItem.setOrderItemsCompositions(getProductComposition(itemRequestDto, orderItem));

            orderItems.add(orderItem);
        }
        return orderItems;
    }

    private Set<OrderItemComposition> getProductComposition(OrderItemRequestDto itemRequestDto, OrderItem orderItem) {
        Set<OrderItemComposition> orderItemCompositions = new HashSet<>();
        Set<OrderItemCompositionRequestDto> orderItemsCompositions = itemRequestDto.getOrderItemsCompositions();
        if (orderItemsCompositions != null) {
            for (OrderItemCompositionRequestDto compositionDtoItem : orderItemsCompositions) {
                OrderItemComposition composition = OrderItemComposition.builder()
                        .orderItem(orderItem)
                        .qty(compositionDtoItem.getQty())
                        .product(
                                productRepository.findById(compositionDtoItem.getProductId()).orElseThrow(() -> new ItemNotFoundException("Composition product not found"))
                        )
                        .build();
                orderItemCompositions.add(composition);
            }
        }
        return orderItemCompositions;
    }
}
