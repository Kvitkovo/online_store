package ua.kvitkovo.users.validator;

import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import ua.kvitkovo.users.dto.UserRequestDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserService;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.utils.Helper;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class UserRequestDtoValidator implements Validator {

    @Setter
    private UserService userService;

    @Override
    public boolean supports(Class<?> clazz) {
        return UserRequestDto.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserRequestDto dto = (UserRequestDto) target;

        if (StringUtils.isBlank(dto.getEmail())) {
            errors.rejectValue("email", "", "is blank!");
        } else {
            User byUsername = userService.findByUsername(dto.getEmail());
            if (byUsername != null){
                errors.rejectValue("email", "", "a user with this email already exists!");
            }
        }
        if (StringUtils.isBlank(dto.getPassword())) {
            errors.rejectValue("password", "", "is blank!");
        }

        String emailRegexPattern = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$";
        if (!Helper.patternMatches(dto.getEmail(), emailRegexPattern)) {
            errors.rejectValue("email", "", "invalid format!");
        }

        String passwordRegexPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$";
        if (!Helper.patternMatches(dto.getEmail(), emailRegexPattern)) {
            errors.rejectValue("password", "", "invalid format!");
        }
    }
}
