package ua.kvitkovo.users.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.users.dto.CreateUserRequestDto;
import ua.kvitkovo.users.dto.UserRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class CreateUserRequestDtoValidator implements Validator {

    @Autowired
    private EmailValidator emailValidator;
    @Autowired
    private PasswordValidator passwordValidator;

    @Override
    public boolean supports(Class<?> clazz) {
        return UserRequestDto.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CreateUserRequestDto dto = (CreateUserRequestDto) target;

        emailValidator.validate("email", dto.getEmail(), errors);
    }
}
