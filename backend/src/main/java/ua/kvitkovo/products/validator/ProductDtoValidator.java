package ua.kvitkovo.products.validator;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.products.dto.ProductRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class ProductDtoValidator implements Validator {


    @Override
    public boolean supports(Class<?> clazz) {
        return ProductDtoValidator.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ProductRequestDto dto = (ProductRequestDto) target;
        if (StringUtils.isBlank(dto.getTitle())) {
            errors.rejectValue("title", "", "is blank!");
        }
    }
}