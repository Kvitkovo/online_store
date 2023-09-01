package ua.kvitkovo.users.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.users.dto.ResetPasswordRequestDto;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class ResetPasswordRequestDtoValidator implements Validator {

    @Autowired
    private PasswordValidator passwordValidator;

    @Override
    public boolean supports(Class<?> clazz) {
        return ResetPasswordRequestDto.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ResetPasswordRequestDto dto = (ResetPasswordRequestDto) target;

        if (dto == null || dto.getVerificationCode().isEmpty()) {
            throw new ItemNotFoundException("Verification code not found");
        }

        passwordValidator.validate("newPassword", dto.getNewPassword(), errors);
    }
}
