package ua.kvitkovo.products.validator;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.products.dto.SizeRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class SizeDtoValidator implements Validator {


    @Override
    public boolean supports(Class<?> clazz) {
        return SizeDtoValidator.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        SizeRequestDto dto = (SizeRequestDto) target;
        if (StringUtils.isBlank(dto.getName())) {
            errors.rejectValue("name", "", "is blank!");
        }
    }
}
