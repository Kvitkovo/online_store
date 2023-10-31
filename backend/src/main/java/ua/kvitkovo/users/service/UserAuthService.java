package ua.kvitkovo.users.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
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
import ua.kvitkovo.security.jwt.AuthenticationGoogleRequestDto;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.*;
import ua.kvitkovo.users.entity.Role;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.entity.UserStatus;
import ua.kvitkovo.users.repository.PositionRepository;
import ua.kvitkovo.users.repository.RoleRepository;
import ua.kvitkovo.users.repository.UserRepository;
import ua.kvitkovo.users.validator.*;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;

import java.util.*;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserAuthService {

    @Value("${google.clientID}")
    private String googleClientId;
    private final NotificationService emailService;
    private final ResetPasswordRequestDtoValidator resetPasswordRequestDtoValidator;
    private final ChangePasswordRequestDtoValidator changePasswordRequestDtoValidator;
    private final UserRepository userRepository;
    private final PositionRepository positionRepository;
    private final ErrorUtils errorUtils;
    private final UserDtoMapper userMapper;
    private final UserRequestDtoValidator userRequestDtoValidator;
    private final CreateUserRequestDtoValidator createUserRequestDtoValidator;
    private final UpdateUserRequestDtoValidator updateUserRequestDtoValidator;
    private final EmployeeRequestDtoValidator employeeRequestDtoValidator;
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

        if (userRequestDto.getPositionId() != null) {
            user.setPosition(positionRepository.findById(userRequestDto.getPositionId()).orElseThrow(
                    () -> {
                        throw new ItemNotFoundException("Position not found");
                    }
            ));
        }

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

        if (dto.getEmail() != null) {
            Optional<User> userByEmail = userRepository.findByEmail(dto.getEmail());
            if (userByEmail.isPresent() && userByEmail.get().getId() != id) {
                throw new ItemNotUpdatedException("User with this email already exists");
            }
        }

        updateUserRequestDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }
        BeanUtils.copyProperties(dto, user, Helper.getNullPropertyNames(dto));
        if (dto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

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

    public UserResponseDto updateEmployee(Long id, EmployeeUpdateRequestDto dto, BindingResult bindingResult) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ItemNotFoundException("User not found")
        );

        Optional<User> userByEmail = userRepository.findByEmail(dto.getEmail());
        if (userByEmail.isPresent() && userByEmail.get().getId() != id) {
            throw new ItemNotUpdatedException("User with this email already exists");
        }

        employeeRequestDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }
        BeanUtils.copyProperties(dto, user, Helper.getNullPropertyNames(dto));

        if (dto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        if (dto.getPositionId() != null) {
            user.setPosition(positionRepository.findById(dto.getPositionId()).orElseThrow(
                    () -> new ItemNotFoundException("Position not found")
            ));
        }

        userRepository.save(user);
        return userMapper.mapEntityToDto(user);
    }

    public User loginGoogle(AuthenticationGoogleRequestDto requestDto) throws Exception {
        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(googleClientId))
                .build();
        GoogleIdToken idToken = verifier.verify(requestDto.getToken());
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            String userId = payload.getSubject();
            log.info("User ID: " + userId);

            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String familyName = (String) payload.get("family_name");
            String givenName = (String) payload.get("given_name");

            log.info("Name: " + name);
            return getUserFromGoogle(email, givenName, familyName);
        } else {
            throw new Exception("Invalid ID token.");
        }
    }

    private User getUserFromGoogle(String email, String firstName, String lastName) {
        Optional<User> byEmail = userRepository.findByEmail(email);
        User user = null;

        if (!byEmail.isPresent()) {
            user = new User();
            Role roleUser = roleRepository.findByName("ROLE_USER").orElseThrow(() -> {
                throw new ItemNotFoundException("Role not found");
            });
            List<Role> userRoles = new ArrayList<>();
            userRoles.add(roleUser);
            user.setEmail(email);

            user.setPassword(passwordEncoder.encode(Helper.getRandomString(10)));
            user.setRoles(userRoles);
            user.setStatus(UserStatus.ACTIVE);
            user.setId(null);

            user.setFirstName(firstName);
            user.setLastName(lastName);
            userRepository.save(user);

        } else {
            user = byEmail.get();
        }
        return user;
    }
}
