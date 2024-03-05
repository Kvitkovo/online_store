package ua.kvitkovo.users.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.users.dto.UpdateUserRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class UpdateUserRequestDtoValidator implements Validator {

    @Autowired
    private EmailValidator emailValidator;

    @Override
    public boolean supports(Class<?> clazz) {
        return UpdateUserRequestDto.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UpdateUserRequestDto dto = (UpdateUserRequestDto) target;

        if (dto.getEmail() != null) {
            emailValidator.validate("email", dto.getEmail(), errors);
        }
    }
}
