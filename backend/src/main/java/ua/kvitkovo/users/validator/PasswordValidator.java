package ua.kvitkovo.users.validator;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import ua.kvitkovo.utils.Helper;

/**
 * @author Andriy Gaponov
 */
@Component
public class PasswordValidator {

    public void validate(String field, String password, Errors errors) {

        if (StringUtils.isBlank(password)) {
            errors.rejectValue(field, "", "is blank!");
        }

        String passwordRegexPattern = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})";
        if (!Helper.patternMatches(password, passwordRegexPattern)) {
            errors.rejectValue(field, "", "invalid format!");
        }
    }
}
