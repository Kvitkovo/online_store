package ua.kvitkovo.users.validator;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.users.dto.ResetPasswordRequestDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.repository.UserRepository;
import ua.kvitkovo.utils.Helper;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class ResetPasswordRequestDtoValidator implements Validator {

    @Autowired
    private UserRepository userRepository;

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

        if (StringUtils.isBlank(dto.getNewPassword())) {
            errors.rejectValue("newPassword", "", "is blank!");
        }

        String passwordRegexPattern = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})";
        if (!Helper.patternMatches(dto.getNewPassword(), passwordRegexPattern)) {
            errors.rejectValue("newPassword", "", "invalid format!");
        }
    }
}
