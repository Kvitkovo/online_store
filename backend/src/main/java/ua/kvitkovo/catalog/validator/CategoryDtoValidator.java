package ua.kvitkovo.catalog.validator;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.catalog.dto.CategoryRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class CategoryDtoValidator implements Validator {


    @Override
    public boolean supports(Class<?> clazz) {
        return CategoryDtoValidator.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CategoryRequestDto dto = (CategoryRequestDto) target;
        if (StringUtils.isBlank(dto.getName())) {
            errors.rejectValue("name", "", "is blank!");
        }
    }
}
