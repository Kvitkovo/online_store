package ua.kvitkovo.orders.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ua.kvitkovo.errorhandling.AccessDeniedException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.orders.entity.Order;
import ua.kvitkovo.orders.entity.OrderStatus;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserService;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class OrderAccessCheckerService {

    private static final String ACCESS_DENIED = "Access denied to order with id ";

    private final UserService userService;

    public void checkUpdateAccess(Order order) {
        if (!userService.isCurrentUserAdmin()) {
            throw new AccessDeniedException(ACCESS_DENIED + order.getId());
        }
    }

    public void checkUpdateStatusAccess(Order order) {
        if (!userService.isCurrentUserAdmin()) {
            User user = userService.getCurrentUser();
            if (user == null || !order.getCustomer().equals(user)) {
                throw new AccessDeniedException(ACCESS_DENIED + order.getId());
            }
        }
        if (!OrderStatus.NEW.equals(order.getStatus())) {
            throw new ItemNotUpdatedException("Order not NEW status");
        }
    }

    public void checkUpdateStatusAccess(List<Order> orders) {
        if (!userService.isCurrentUserAdmin()) {
            User user = userService.getCurrentUser();
            for (Order order : orders) {
                if (!order.getCustomer().equals(user)) {
                    throw new AccessDeniedException(ACCESS_DENIED + order.getId());
                }
                if (!OrderStatus.NEW.equals(order.getStatus())) {
                    throw new ItemNotUpdatedException("Order not NEW status");
                }
            }
        }
    }

    public void checkViewAccess(Order order) {
        if (!userService.isCurrentUserAdmin()) {
            User user = userService.getCurrentUser();
            if (user == null || !order.getCustomer().equals(user)) {
                throw new AccessDeniedException(ACCESS_DENIED + order.getId());
            }
        }
    }
}
