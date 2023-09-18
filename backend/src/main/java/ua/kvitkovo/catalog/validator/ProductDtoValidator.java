package ua.kvitkovo.catalog.validator;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.catalog.dto.ProductRequestDto;


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
            return;
        }
        if (dto.getTitle().length() > 250) {
            errors.rejectValue("title", "", "length > 255!");
        }
        if (dto.getCategoryId() <= 0) {
            errors.rejectValue("categoryId", "", "is blank!");
        }
    }
}
