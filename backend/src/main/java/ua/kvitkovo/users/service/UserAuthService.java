package ua.kvitkovo.users.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.notifications.NotificationService;
import ua.kvitkovo.notifications.NotificationType;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.*;
import ua.kvitkovo.users.entity.Role;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.entity.UserStatus;
import ua.kvitkovo.users.repository.RoleRepository;
import ua.kvitkovo.users.repository.UserRepository;
import ua.kvitkovo.users.validator.*;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserAuthService {

    private final NotificationService emailService;
    private final ResetPasswordRequestDtoValidator resetPasswordRequestDtoValidator;
    private final ChangePasswordRequestDtoValidator changePasswordRequestDtoValidator;
    private final UserRepository userRepository;
    private final ErrorUtils errorUtils;
    private final UserDtoMapper userMapper;
    private final UserRequestDtoValidator userRequestDtoValidator;
    private final CreateUserRequestDtoValidator createUserRequestDtoValidator;
    private final UpdateUserRequestDtoValidator updateUserRequestDtoValidator;
    private final RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Value("${site.base.url}")
    private String baseSiteUrl;

    public UserResponseDto register(UserRequestDto userRequestDto, BindingResult bindingResult) {
        userRequestDtoValidator.validate(userRequestDto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        User user = userMapper.mapDtoRequestToDto(userRequestDto);
        Role roleUser = roleRepository.findByName("ROLE_USER").orElseThrow(() -> {
            throw new ItemNotFoundException("Role not found");
        });
        List<Role> userRoles = new ArrayList<>();
        userRoles.add(roleUser);

        user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        user.setRoles(userRoles);
        user.setStatus(UserStatus.NOT_ACTIVE);
        user.setId(null);
        user.setEmailConfirmCode(UUID.randomUUID().toString());
        user.setEmailConfirmed(false);

        User registeredUser = userRepository.save(user);

        Map<String, Object> fields = Map.of(
                "link", constructUrlForConfirmEmailMessage(registeredUser),
                "userName", user.getFirstName()
        );
        emailService.send(NotificationType.MAIL_CONFIRMATION, fields, registeredUser);

        log.info("IN register - user: {} successfully registered", registeredUser);
        return userMapper.mapEntityToDto(registeredUser);
    }

    public UserResponseDto addUser(CreateUserRequestDto userRequestDto, BindingResult bindingResult) {
        createUserRequestDtoValidator.validate(userRequestDto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        User user = userMapper.mapDtoRequestToDto(userRequestDto);

        Role roleUser;
        if (!StringUtils.isBlank(userRequestDto.getRole())) {
            roleUser = roleRepository.findByName(userRequestDto.getRole()).orElseThrow(() -> {
                throw new ItemNotFoundException("Role not found");
            });
        } else {
            roleUser = roleRepository.findByName("ROLE_USER").orElseThrow(() -> {
                throw new ItemNotFoundException("Role not found");
            });
        }

        List<Role> userRoles = new ArrayList<>();
        userRoles.add(roleUser);
        String newPassword = Helper.getRandomString(12);
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setRoles(userRoles);
        user.setStatus(UserStatus.ACTIVE);
        user.setId(null);
        user.setEmailConfirmCode(UUID.randomUUID().toString());
        user.setEmailConfirmed(false);

        User registeredUser = userRepository.save(user);
        log.info("user: {} successfully created", registeredUser);

        Map<String, Object> fields = Map.of(
                "link", constructUrlForConfirmEmailMessage(registeredUser),
                "userName", user.getFirstName(),
                "password", newPassword
        );
        emailService.send(NotificationType.CREATE_NEW_USER, fields, registeredUser);

        return userMapper.mapEntityToDto(registeredUser);
    }

    public UserResponseDto updateUser(Long id, UserRequestDto dto, BindingResult bindingResult) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ItemNotFoundException("User not found")
        );
        updateUserRequestDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }
        BeanUtils.copyProperties(dto, user, Helper.getNullPropertyNames(dto));
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);
        return userMapper.mapEntityToDto(user);
    }

    private String constructUrlForConfirmEmailMessage(User user) {
        return baseSiteUrl + "/user/email/" + user.getEmailConfirmCode() + "/confirm";
    }

    public void confirmEmail(String code) throws ItemNotFoundException {
        if (code == null || code.isEmpty()) {
            throw new ItemNotFoundException("Verification code not found");
        }
        User user = userRepository.findByEmailConfirmCode(code).orElseThrow(
                () -> new ItemNotFoundException("Verification code not found")
        );
        log.info("IN findByVerificationCode - user: {} found by Verification Code: {}", user, code);
        user.setEmailConfirmed(true);
        user.setEmailConfirmCode("");
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        Map<String, Object> fields = Map.of(
                "message", "Ви успішно підтвердили пошту.",
                "link", baseSiteUrl
        );
        emailService.send(NotificationType.MAIL_CONFIRMATION_SUCCESSFULLY, fields, user);
    }

    public void sendResetPassword(String email) {
        if (email == null || email.isEmpty()) {
            throw new ItemNotFoundException("User email not found");
        }
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new ItemNotFoundException("User email not found")
        );
        user.setEmailConfirmCode(UUID.randomUUID().toString());
        userRepository.save(user);

        Map<String, Object> fields = Map.of(
                "link", constructUrlForResetPasswordEmailMessage(user)
        );
        emailService.send(NotificationType.RESET_PASSWORD, fields, user);
    }


    private String constructUrlForResetPasswordEmailMessage(User user) {
        return baseSiteUrl + "/user/resetPassword/" + user.getEmailConfirmCode();
    }

    public void resetPassword(ResetPasswordRequestDto resetPasswordRequestDto,
                              BindingResult bindingResult) {
        resetPasswordRequestDtoValidator.validate(resetPasswordRequestDto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }

        User user = userRepository.findByEmailConfirmCode(
                resetPasswordRequestDto.getVerificationCode()).orElseThrow(
                () -> new ItemNotFoundException("Verification code not found")
        );

        user.setPassword(passwordEncoder.encode(resetPasswordRequestDto.getNewPassword()));
        user.setEmailConfirmCode("");
        userRepository.save(user);
        Map<String, Object> fields = Map.of(
                "message", "Ви успішно змінили пароль.",
                "link", baseSiteUrl
        );
        emailService.send(NotificationType.CHANGE_PASSWORD, fields, user);
    }

    public void changePassword(ChangePasswordRequestDto changePasswordRequestDto,
                               BindingResult bindingResult) {
        changePasswordRequestDtoValidator.validate(changePasswordRequestDto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }

        User user = userRepository.findByEmail(changePasswordRequestDto.getEmail()).orElseThrow(
                () -> new ItemNotFoundException("User not found")
        );
        user.setPassword(passwordEncoder.encode(changePasswordRequestDto.getNewPassword()));
        userRepository.save(user);
        Map<String, Object> fields = Map.of(
                "message", "Ви успішно змінили пароль.",
                "link", baseSiteUrl
        );
        emailService.send(NotificationType.CHANGE_PASSWORD, fields, user);
    }
}