package ua.kvitkovo.catalog.validator;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.catalog.dto.SizeRequestDto;


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
        if (dto.getMin() < 0) {
            errors.rejectValue("min", "", "< 0");
        }
        if (dto.getMin() > dto.getMax()) {
            errors.rejectValue("min", "", "> max");
        }
    }
}
