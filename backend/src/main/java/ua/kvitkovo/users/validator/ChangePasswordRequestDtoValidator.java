package ua.kvitkovo.users.validator;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.kvitkovo.users.dto.ChangePasswordRequestDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.repository.UserRepository;
import ua.kvitkovo.utils.Helper;

import java.util.Optional;


/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Component
public class ChangePasswordRequestDtoValidator implements Validator {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public boolean supports(Class<?> clazz) {
        return ChangePasswordRequestDto.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ChangePasswordRequestDto dto = (ChangePasswordRequestDto) target;

        if (StringUtils.isBlank(dto.getEmail())) {
            errors.rejectValue("email", "", "is blank!");
        } else {
            Optional<User> byUsername = userRepository.findByEmail(dto.getEmail());
            if (byUsername.isEmpty()) {
                errors.rejectValue("email", "", "a user with this email not exists!");
            } else {
                if (!passwordEncoder.matches(dto.getOldPassword(), byUsername.get().getPassword())) {
                    errors.rejectValue("oldPassword", "", "wrong old user password!");
                }
            }
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
