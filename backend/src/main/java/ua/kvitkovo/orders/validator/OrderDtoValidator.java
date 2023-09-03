package ua.kvitkovo.orders.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.orders.dto.OrderRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class OrderDtoValidator implements Validator {


    @Override
    public boolean supports(Class<?> clazz) {
        return OrderDtoValidator.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        OrderRequestDto dto = (OrderRequestDto) target;
    }
}
