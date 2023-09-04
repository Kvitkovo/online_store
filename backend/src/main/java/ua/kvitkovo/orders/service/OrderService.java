package ua.kvitkovo.orders.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.orders.dto.OrderRequestDto;
import ua.kvitkovo.orders.dto.OrderResponseDto;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class OrderService {

    public OrderResponseDto addOrder(OrderRequestDto dto, BindingResult bindingResult) {
        return null;
    }
}
