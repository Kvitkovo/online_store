package ua.kvitkovo.users.validator;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.users.dto.UserRequestDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.repository.UserRepository;
import ua.kvitkovo.utils.Helper;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class UserRequestDtoValidator implements Validator {

    @Autowired
    private UserRepository userRepository;

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
            Optional<User> byUsername = userRepository.findByEmail(dto.getEmail());
            if (!byUsername.isEmpty()) {
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

        if (dto.getEmail().endsWith(".ru")) {
            errors.rejectValue("email", "", "invalid format!");
        }

        String passwordRegexPattern = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})";
        if (!Helper.patternMatches(dto.getPassword(), passwordRegexPattern)) {
            errors.rejectValue("password", "", "invalid format!");
        }
    }
}
