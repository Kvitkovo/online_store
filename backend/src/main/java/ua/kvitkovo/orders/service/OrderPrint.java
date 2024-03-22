package ua.kvitkovo.orders.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import ua.kvitkovo.orders.converter.OrderDtoMapper;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.entity.Order;
import ua.kvitkovo.utils.CurrencyUtils;
import ua.kvitkovo.utils.PdfGenerator;

@Slf4j
@RequiredArgsConstructor
@Service
public class OrderPrint {

    private final OrderDtoMapper orderDtoMapper;
    @Autowired
    private SpringTemplateEngine templateEngine;

    public InputStreamResource printSalesReceipt(Order order) throws Exception {
        String totalSumInWords = CurrencyUtils.formatAmountInUkrainian(order.getTotalSum());

        OrderResponseDto orderResponseDto = orderDtoMapper.mapEntityToDto(order);

        Context context = new Context();
        context.setVariable("amountInWords", totalSumInWords);
        context.setVariable("order", orderResponseDto);
        context.setVariable("shop", order.getShop());

        String html = templateEngine.process("print/sales-receipt.html", context);

        return PdfGenerator.generatePdfFromThymeleaf(html);
    }


}
