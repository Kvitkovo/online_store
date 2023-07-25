package ua.kvitkovo.shop.validator;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.shop.dto.ShopRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class ShopDtoValidator implements Validator {


    @Override
    public boolean supports(Class<?> clazz) {
        return ShopDtoValidator.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ShopRequestDto dto = (ShopRequestDto) target;
        if (StringUtils.isBlank(dto.getTitle())) {
            errors.rejectValue("title", "", "is blank!");
        }
    }
}
