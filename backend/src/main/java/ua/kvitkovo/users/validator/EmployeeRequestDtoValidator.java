package ua.kvitkovo.users.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.users.dto.EmployeeUpdateRequestDto;
import ua.kvitkovo.users.dto.UserRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class EmployeeRequestDtoValidator implements Validator {

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
        EmployeeUpdateRequestDto dto = (EmployeeUpdateRequestDto) target;

        if (dto.getEmail() != null) {
            emailValidator.validate("email", dto.getEmail(), errors);
        }
        if (dto.getPassword() != null) {
            passwordValidator.validate("password", dto.getPassword(), errors);
        }
    }
}
