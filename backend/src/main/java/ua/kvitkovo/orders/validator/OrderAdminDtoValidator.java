package ua.kvitkovo.orders.validator;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.orders.dto.OrderAdminRequestDto;
import ua.kvitkovo.orders.dto.OrderItemRequestDto;
import ua.kvitkovo.users.validator.EmailValidator;

import java.math.BigDecimal;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class OrderAdminDtoValidator implements Validator {

    @Autowired
    private EmailValidator emailValidator;

    @Override
    public boolean supports(Class<?> clazz) {
        return OrderAdminDtoValidator.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        OrderAdminRequestDto dto = (OrderAdminRequestDto) target;

        emailValidator.validate("customerEmail", dto.getCustomerEmail(), errors);

        if (StringUtils.isBlank(dto.getCustomerName())) {
            errors.rejectValue("customerName", "", "is blank!");
        }

        if (StringUtils.isBlank(dto.getCustomerPhone())) {
            errors.rejectValue("customerPhone", "", "is blank!");
        }

        if (dto.getShopId() == null || dto.getShopId() <= 0) {
            errors.rejectValue("shopId", "", "is blank!");
        }

        if (dto.getManagerId() == null || dto.getManagerId() <= 0) {
            errors.rejectValue("managerId", "", "is blank!");
        }

        if (dto.getOrderItems() == null || dto.getOrderItems().size() == 0) {
            errors.rejectValue("orderItems", "", "is blank!");
        }

        if (dto.getOrderItems() != null) {
            for (OrderItemRequestDto orderItem : dto.getOrderItems()) {
                if (orderItem.getQty().compareTo(BigDecimal.ZERO) != 1) {
                    errors.rejectValue("orderItems", "", "quantity is not valid!");
                    break;
                }
                if (orderItem.getPrice().compareTo(BigDecimal.ZERO) != 1) {
                    errors.rejectValue("orderItems", "", "price is not valid!");
                    break;
                }
                if (StringUtils.isBlank(orderItem.getProductTitle())) {
                    errors.rejectValue("orderItems", "", "product title blank!");
                    break;
                }
            }
        }
    }
}
