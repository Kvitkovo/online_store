package ua.kvitkovo.orders.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.service.ProductService;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.orders.converter.OrderItemDtoMapper;
import ua.kvitkovo.orders.dto.OrderItemCompositionRequestDto;
import ua.kvitkovo.orders.dto.OrderItemRequestDto;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.admin.*;
import ua.kvitkovo.orders.entity.Order;
import ua.kvitkovo.orders.entity.OrderItem;
import ua.kvitkovo.orders.entity.OrderItemComposition;
import ua.kvitkovo.orders.entity.OrderStatus;
import ua.kvitkovo.orders.repository.OrderRepository;
import ua.kvitkovo.orders.validator.OrderAdminDtoValidator;
import ua.kvitkovo.orders.validator.OrderDtoValidator;
import ua.kvitkovo.shop.service.ShopService;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserService;
import ua.kvitkovo.utils.Helper;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDtoValidator orderDtoValidator;
    private final OrderAdminDtoValidator orderAdminDtoValidator;
    private final ShopService shopService;
    private final UserService userService;
    private final ProductService productService;

    public Order findById(Long id) throws ItemNotFoundException {
        return orderRepository.findById(id).orElseThrow(() -> new ItemNotFoundException("Order not found"));
    }

    public void fillAvailableProduct(OrderAdminResponseDto order) {
        Set<OrderItemAdminResponseDto> orderItems = order.getOrderItems();
        for (OrderItemAdminResponseDto orderItem : orderItems) {
            ProductAdminResponseDto product = orderItem.getProduct();
            if (product != null) {
                product.setAvailable(
                        product.getStock() + orderItem.getQty() - getInOrders(product.getId()));
            }
            Set<OrderItemCompositionAdminResponseDto> orderItemsCompositions = orderItem.getOrderItemsCompositions();
            for (OrderItemCompositionAdminResponseDto orderItemsComposition : orderItemsCompositions) {
                ProductAdminResponseDto compositionProduct = orderItemsComposition.getProduct();
                if (compositionProduct != null) {
                    compositionProduct.setAvailable(
                            compositionProduct.getStock() + orderItemsComposition.getQty()
                                    - getInOrders(compositionProduct.getId()));
                }
            }
        }
    }

    public int getInOrders(Long productId) {
        return orderRepository.getProductCountInOrders(productId);
    }

    @Transactional
    public Order addOrder(OrderRequestDto dto, BindingResult bindingResult) {
        orderDtoValidator.validate(dto, bindingResult);

        Order order = new Order();
        BeanUtils.copyProperties(dto, order);
        order.setId(null);
        order.setShop(shopService.findById(dto.getShopId()));
        order.setAddress(getFullTextAddress(order));
        order.setStatus(OrderStatus.NEW);

        order.setOrderItems(createOrderItemsFromDtosRequest(order, dto.getOrderItems()));
        order.setTotalSum(calculateTotalSum(order));

        try {
            User customer = userService.getCurrentUser();
            order.setCustomer(customer);
        } catch (Exception e) {
            //NOP
        }
        orderRepository.save(order);

        log.info("The Order was created");
        return order;
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
        if (orderItems == null || orderItems.isEmpty()) {
            return totalSum;
        }

        for (OrderItem orderItem : orderItems) {
            BigDecimal itemSum = orderItem.getPrice().multiply(
                    BigDecimal.valueOf(orderItem.getQty()));
            totalSum = totalSum.add(itemSum);
        }
        return totalSum;
    }

    private Set<OrderItem> createOrderItemsFromDtosRequest(Order order, Set<OrderItemRequestDto> dtoOrderItems) {
        if (dtoOrderItems == null) {
            return Collections.emptySet();
        }
        Set<OrderItem> orderItems = new HashSet<>();
        for (OrderItemRequestDto itemRequestDto : dtoOrderItems) {
            OrderItem orderItem = OrderItem.builder()
                    .price(itemRequestDto.getPrice())
                    .qty(itemRequestDto.getQty())
                    .productTitle(itemRequestDto.getProductTitle())
                    .order(order)
                    .build();

            if (itemRequestDto.getProductId() != null) {
                orderItem.setProduct(productService.findById(itemRequestDto.getProductId()));
            } else {
                orderItem.setProduct(null);
            }
            orderItem.setOrderItemsCompositions(createProductComposition(itemRequestDto, orderItem));

            orderItems.add(orderItem);
        }
        return orderItems;
    }

    private Set<OrderItemComposition> createProductComposition(OrderItemRequestDto itemRequestDto,
                                                               OrderItem orderItem) {
        Set<OrderItemComposition> orderItemCompositions = new HashSet<>();
        Set<OrderItemCompositionRequestDto> orderItemsCompositions = itemRequestDto.getOrderItemsCompositions();
        if (orderItemsCompositions != null) {
            for (OrderItemCompositionRequestDto compositionDtoItem : orderItemsCompositions) {
                OrderItemComposition composition = OrderItemComposition.builder()
                        .orderItem(orderItem)
                        .qty(compositionDtoItem.getQty())
                        .product(productService.findById(compositionDtoItem.getProductId()))
                        .build();
                orderItemCompositions.add(composition);
            }
        }
        return orderItemCompositions;
    }

    @Transactional
    public List<Order> updateOrdersStatus(List<Long> ordersID, OrderStatus status) {
        List<Order> orders = ordersID.stream()
                .map(id -> orderRepository.findById(id)
                        .orElseThrow(() -> new ItemNotFoundException("Order not found")))
                .toList();

        for (Order order : orders) {
            checkIfCanChangeOrder(order);
            order.setStatus(status);
            orderRepository.save(order);
            changeStocks(order);
        }
        return orders;
    }

    private void checkIfCanChangeOrder(Order order) {
        if (OrderStatus.DONE.equals(order.getStatus())) {
            throw new ItemNotUpdatedException("Orders with the status COMPLETED cannot be changed");
        }
    }

    private void changeStocks(Order order) {
        if (OrderStatus.DONE.equals(order.getStatus())) {
            for (OrderItem orderItem : order.getOrderItems()) {
                productService.minusStock(orderItem.getProduct(), orderItem.getQty());
                for (OrderItemComposition orderItemsComposition : orderItem.getOrderItemsCompositions()) {
                    productService.minusStock(orderItemsComposition.getProduct(), orderItem.getQty());
                }
            }
        }
    }

    @Transactional
    public Order updateOrder(Order order, OrderAdminRequestDto dto,
                             BindingResult bindingResult) {
        orderAdminDtoValidator.validate(dto, bindingResult);
        BeanUtils.copyProperties(dto, order, Helper.getNullPropertyNames(dto));
        checkIfCanChangeOrder(order);
        order.setShop(shopService.findById(dto.getShopId()));
        order.setManager(userService.findById(dto.getManagerId()));
        order.setAddress(getFullTextAddress(order));

        order.setOrderItems(createOrderItemsFromDtosRequest(order, dto.getOrderItems()));
        order.setTotalSum(calculateTotalSum(order));

        orderRepository.save(order);
        changeStocks(order);
        return order;
    }

    @Transactional
    public Order cancelOrder(Long id) {
        Order order = findById(id);
        order.setStatus(OrderStatus.CANCELED);
        orderRepository.save(order);
        return order;
    }

    public Page<Order> getActiveOrdersForCurrentUser(Pageable pageable) {
        Page<Order> orders = orderRepository.findAllByCustomerIdAndStatusNotIn(pageable,
                userService.getCurrentUserId(), List.of(OrderStatus.DONE, OrderStatus.CANCELED));
        if (orders.isEmpty()) {
            return Page.empty();
        } else {
            return orders;
        }
    }

    public Page<Order> getAllOrdersForUser(Pageable pageable, Long id) {
        userService.findById(id);
        Page<Order> orders = orderRepository.findAllByCustomerId(pageable, id);
        if (orders.isEmpty()) {
            return Page.empty();
        } else {
            return orders;
        }
    }

    public Page<Order> getAllOrders(Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(pageable);
        if (orders.isEmpty()) {
            return Page.empty();
        } else {
            return orders;
        }
    }
}
