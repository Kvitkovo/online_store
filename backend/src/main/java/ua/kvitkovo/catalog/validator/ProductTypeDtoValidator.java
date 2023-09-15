package ua.kvitkovo.catalog.validator;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.catalog.dto.ProductTypeRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class ProductTypeDtoValidator implements Validator {


    @Override
    public boolean supports(Class<?> clazz) {
        return ProductTypeDtoValidator.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ProductTypeRequestDto dto = (ProductTypeRequestDto) target;
        if (StringUtils.isBlank(dto.getName())) {
            errors.rejectValue("name", "", "is blank!");
            return;
        }
        if (dto.getName().length() > 255) {
            errors.rejectValue("name", "", "length > 255!");
        }
    }
}
