package ua.kvitkovo.orders.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ua.kvitkovo.orders.entity.Order;
import ua.kvitkovo.utils.CurrencyUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class OrderPrint {

    private final OrderService orderService;

    public void printSalesReceipt(Order order) {
        String totalSumInWords = CurrencyUtils.formatAmountInUkrainian(order.getTotalSum());

    }


}
