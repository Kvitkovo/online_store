package ua.kvitkovo.orders.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.catalog.repository.ProductRepository;
import ua.kvitkovo.errorhandling.AccessDeniedException;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.orders.converter.OrderDtoMapper;
import ua.kvitkovo.orders.converter.OrderItemDtoMapper;
import ua.kvitkovo.orders.dto.OrderItemCompositionRequestDto;
import ua.kvitkovo.orders.dto.OrderItemRequestDto;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.dto.admin.*;
import ua.kvitkovo.orders.entity.Order;
import ua.kvitkovo.orders.entity.OrderItem;
import ua.kvitkovo.orders.entity.OrderItemComposition;
import ua.kvitkovo.orders.entity.OrderStatus;
import ua.kvitkovo.orders.repository.OrderRepository;
import ua.kvitkovo.orders.validator.OrderAdminDtoValidator;
import ua.kvitkovo.orders.validator.OrderDtoValidator;
import ua.kvitkovo.shop.repository.ShopRepository;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.repository.UserRepository;
import ua.kvitkovo.users.service.UserService;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
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
    private final OrderAdminDtoValidator orderAdminDtoValidator;
    private final ShopRepository shopRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderDtoMapper orderDtoMapper;
    private final OrderItemDtoMapper orderItemDtoMapper;
    private final ErrorUtils errorUtils;
    private final UserService userService;
    private final UserDtoMapper userDtoMapper;

    public OrderResponseDto findById(Long id) throws ItemNotFoundException {
        OrderResponseDto order = orderRepository.findById(id)
                .map(orderDtoMapper::mapEntityToDto)
                .orElseThrow(() -> new ItemNotFoundException("Order not found"));

        if (!userService.isCurrentUserAdmin()
                && userService.getCurrentUserId() != order.getCustomerId()) {
            throw new ItemNotFoundException("Order not found");
        }
        return order;
    }

    public OrderAdminResponseDto findByIdForAdmin(Long id) {
        OrderAdminResponseDto order = orderRepository.findById(id)
            .map(orderDtoMapper::mapEntityToDtoForAdmin)
            .orElseThrow(() -> new ItemNotFoundException("Order not found"));

        if (!userService.isCurrentUserAdmin()
            && userService.getCurrentUserId() != order.getCustomerId()) {
            throw new ItemNotFoundException("Order not found");
        }
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
        return order;
    }

    public int getInOrders(Long productId) {
        int inOrders = 0;
        List<OrderStatus> statusList = List.of(OrderStatus.ACCEPT, OrderStatus.IS_DELIVERED);
        List<Order> orders = orderRepository.findAllByStatusIn(statusList);
        for (Order order : orders) {
            for (OrderItem orderItem : order.getOrderItems()) {
                Product product = orderItem.getProduct();
                if (product != null) {
                    inOrders += orderItem.getQty();
                }

                for (OrderItemComposition orderItemsComposition : orderItem.getOrderItemsCompositions()) {
                    Product compositionProduct = orderItemsComposition.getProduct();
                    if (compositionProduct != null) {
                        inOrders += orderItemsComposition.getQty();
                    }
                }
            }
        }
        return inOrders;
    }

    @Transactional
    public OrderResponseDto addOrder(OrderRequestDto dto, BindingResult bindingResult) {
        orderDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        Order order = orderDtoMapper.mapDtoRequestToEntity(dto);
        order.setId(null);
        order.setShop(shopRepository.findById(dto.getShopId())
            .orElseThrow(() -> new ItemNotFoundException("Shop not found")));
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
            BigDecimal itemSum = orderItem.getPrice().multiply(
                BigDecimal.valueOf(orderItem.getQty()));
            totalSum = totalSum.add(itemSum);
        }
        return totalSum;
    }

    private Set<OrderItem> getOrderItemsFromDtosRequest(Order order,
        Set<OrderItemRequestDto> dtoOrderItems) {
        if (dtoOrderItems == null) {
            return null;
        }
        Set<OrderItem> orderItems = new HashSet<>();
        for (OrderItemRequestDto itemRequestDto : dtoOrderItems) {
            OrderItem orderItem = orderItemDtoMapper.mapDtoRequestToEntity(itemRequestDto);
            if (itemRequestDto.getProductId() != null) {
                orderItem.setProduct(
                    productRepository.findById(itemRequestDto.getProductId())
                        .orElseThrow(() -> new ItemNotFoundException("Product not found"))
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

    private Set<OrderItemComposition> getProductComposition(OrderItemRequestDto itemRequestDto,
        OrderItem orderItem) {
        Set<OrderItemComposition> orderItemCompositions = new HashSet<>();
        Set<OrderItemCompositionRequestDto> orderItemsCompositions = itemRequestDto.getOrderItemsCompositions();
        if (orderItemsCompositions != null) {
            for (OrderItemCompositionRequestDto compositionDtoItem : orderItemsCompositions) {
                OrderItemComposition composition = OrderItemComposition.builder()
                    .orderItem(orderItem)
                    .qty(compositionDtoItem.getQty())
                    .product(
                        productRepository.findById(compositionDtoItem.getProductId()).orElseThrow(
                            () -> new ItemNotFoundException("Composition product not found"))
                    )
                    .build();
                orderItemCompositions.add(composition);
            }
        }
        return orderItemCompositions;
    }

    @Transactional
    public List<OrderResponseDto> updateOrdersStatus(List<Long> ordersID, OrderStatus status) {
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
        return orderDtoMapper.mapEntityToDto(orders);
    }

    private void checkIfCanChangeOrder(Order order) {
        if (OrderStatus.DONE.equals(order.getStatus())) {
            throw new ItemNotUpdatedException("Orders with the status COMPLETED cannot be changed");
        }
    }

    private void changeStocks(Order order) {
        if (OrderStatus.DONE.equals(order.getStatus())) {
            for (OrderItem orderItem : order.getOrderItems()) {
                Product product = orderItem.getProduct();
                if (product != null) {
                    product.setStock(product.getStock() - orderItem.getQty());
                    productRepository.save(product);
                }
                for (OrderItemComposition orderItemsComposition : orderItem.getOrderItemsCompositions()) {
                    Product compositionProduct = orderItemsComposition.getProduct();
                    if (compositionProduct != null) {
                        compositionProduct.setStock(
                            compositionProduct.getStock() - orderItem.getQty());
                        productRepository.save(compositionProduct);
                    }
                }
            }
        }
    }

    @Transactional
    public OrderResponseDto updateOrder(Long id, OrderAdminRequestDto dto,
        BindingResult bindingResult) {

        if (!userService.isCurrentUserAdmin()) {
            throw new AccessDeniedException();
        }

        OrderResponseDto orderResponseDto = findById(id);
        orderAdminDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        BeanUtils.copyProperties(dto, orderResponseDto, Helper.getNullPropertyNames(dto));

        Order order = orderDtoMapper.mapDtoToEntity(orderResponseDto);
        checkIfCanChangeOrder(order);

        order.setId(id);
        order.setCustomer(userRepository.findById(orderResponseDto.getCustomerId())
                .orElseThrow(() -> new ItemNotFoundException("Customer not found")));
        order.setShop(shopRepository.findById(dto.getShopId())
                .orElseThrow(() -> new ItemNotFoundException("Shop not found")));
        order.setManager(userRepository.findById(dto.getManagerId())
                .orElseThrow(() -> new ItemNotFoundException("User not found")));
        order.setAddress(getFullTextAddress(order));

        order.setOrderItems(getOrderItemsFromDtosRequest(order, dto.getOrderItems()));
        order.setTotalSum(calculateTotalSum(order));

        orderRepository.save(order);
        changeStocks(order);
        return orderDtoMapper.mapEntityToDto(order);
    }

    @Transactional
    public OrderResponseDto cancelOrder(Long id) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new ItemNotFoundException("Order not found"));

        if (!userService.isCurrentUserAdmin()
            && userService.getCurrentUserId() != order.getCustomer()
            .getId()) {
            throw new ItemNotFoundException("Order not found");
        }
        if (!OrderStatus.NEW.equals(order.getStatus())) {
            throw new ItemNotUpdatedException("Order not NEW status");
        }
        order.setStatus(OrderStatus.CANCELED);
        orderRepository.save(order);
        return orderDtoMapper.mapEntityToDto(order);
    }

    public Page<OrderResponseDto> getActiveOrdersForCurrentUser(Pageable pageable) {
        Page<Order> orders = orderRepository.findAllByCustomerIdAndStatusNotIn(pageable,
            userService.getCurrentUserId(), List.of(OrderStatus.DONE, OrderStatus.CANCELED));
        if (orders.isEmpty()) {
            return Page.empty();
        } else {
            return orders.map(orderDtoMapper::mapEntityToDto);
        }
    }

    public Page<OrderResponseDto> getAllOrdersForUser(Pageable pageable, Long id) {
        userRepository.findById(id).orElseThrow(() -> new ItemNotFoundException("User not found"));

        Page<Order> orders = orderRepository.findAllByCustomerId(pageable, id);
        if (orders.isEmpty()) {
            return Page.empty();
        } else {
            return orders.map(orderDtoMapper::mapEntityToDto);
        }
    }

    public Page<OrderResponseDto> getAllOrders(Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(pageable);
        if (orders.isEmpty()) {
            return Page.empty();
        } else {
            return orders.map(orderDtoMapper::mapEntityToDto);
        }
    }
}
