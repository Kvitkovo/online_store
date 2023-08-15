package ua.kvitkovo.images.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.images.dto.ImageRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class ImageDtoValidator implements Validator {


    @Override
    public boolean supports(Class<?> clazz) {
        return ImageDtoValidator.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ImageRequestDto dto = (ImageRequestDto) target;

        if (dto.getFile().isEmpty()) {
            errors.rejectValue("file", "", "is empty!");
        }
    }
}
