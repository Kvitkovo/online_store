package ua.kvitkovo.users.validator;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.repository.UserRepository;
import ua.kvitkovo.utils.Helper;

import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
@Component
public class EmailValidator {

    @Autowired
    private UserRepository userRepository;

    public void validate(String field, String email, Errors errors, boolean checkUser) {

        if (StringUtils.isBlank(email)) {
            errors.rejectValue(field, "", "is blank!");
            return;
        }

        if (checkUser) {
            Optional<User> byUsername = userRepository.findByEmail(email);
            if (!byUsername.isEmpty()) {
                errors.rejectValue(field, "", "a user with this email already exists!");
            }
        }

        String emailRegexPattern = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$";
        if (!Helper.patternMatches(email, emailRegexPattern)) {
            errors.rejectValue(field, "", "invalid format!");
        }

        if (email.endsWith(".ru")) {
            errors.rejectValue(field, "", "invalid format!");
        }
    }
}
