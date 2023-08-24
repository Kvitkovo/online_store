package ua.kvitkovo.users.service;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.security.jwt.JwtUser;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.UserRequestDto;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.Role;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.entity.UserStatus;
import ua.kvitkovo.users.repository.RoleRepository;
import ua.kvitkovo.users.repository.UserRepository;
import ua.kvitkovo.users.validator.UserRequestDtoValidator;
import ua.kvitkovo.utils.ErrorUtils;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserDtoMapper userMapper;
    private final UserRequestDtoValidator userRequestDtoValidator;
    private final ErrorUtils errorUtils;
    private BCryptPasswordEncoder passwordEncoder;

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    public UserResponseDto register(UserRequestDto userRequestDto, BindingResult bindingResult,
        HttpServletRequest httpRequest) {
        userRequestDtoValidator.validate(userRequestDto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        User user = userMapper.mapDtoRequestToDto(userRequestDto);
        Role roleUser = roleRepository.findByName("ROLE_USER");
        List<Role> userRoles = new ArrayList<>();
        userRoles.add(roleUser);

        passwordEncoder = encoder();

        user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        user.setRoles(userRoles);
        user.setStatus(UserStatus.ACTIVE);
        user.setId(null);
        user.setEmailConfirmCode(UUID.randomUUID().toString());
        user.setEmailConfirmed(false);

        User registeredUser = userRepository.save(user);

        String confirmEmailLink = constructUrlForConfirmEmailMessage(httpRequest, registeredUser);
        //TODO send email with code for confirm

        log.info("IN register - user: {} successfully registered", registeredUser);
        return userMapper.mapEntityToDto(registeredUser);
    }

    public List<User> getAll() {
        List<User> result = userRepository.findAll();
        log.info("IN getAll - {} users found", result.size());
        return result;
    }

    public List<User> getAllUsers() {
        List<User> result = userRepository.findAll();
        log.info("IN getAll - {} users found", result.size());
        return result;
    }

    public User findByUsername(String username) {
        User user = userRepository.findByEmail(username).orElseThrow(
            () -> new ItemNotFoundException("User email not found")
        );
        log.info("IN findByUsername - user: {} found by username: {}", user, username);
        return user;
    }

    public User findById(Long id) {
        User result = userRepository.findById(id).orElse(null);

        if (result == null) {
            log.warn("IN findById - no user found by id: {}", id);
            return null;
        }

        log.info("IN findById - user: {} found by id: {}", result);
        return result;
    }

    public Page<UserResponseDto> getClientsByPage(Pageable pageable) {
        Page<User> users = userRepository.findAllClient(pageable);
        if (users.isEmpty()) {
            throw new ItemNotFoundException("Clients don't exist in the Data Base");
        }
        return users.map(userMapper::mapEntityToDto);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
        log.info("IN delete - user with id: {} successfully deleted");
    }

    public User getCurrentUser() {
        JwtUser principal = (JwtUser) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
        return findById(principal.getId());
    }

    public void findByVerificationCode(String code) throws ItemNotFoundException {
        if (code == null || code.isEmpty()) {
            throw new ItemNotFoundException("Verification code not found");
        }
        User user = userRepository.findByEmailConfirmCode(code).orElseThrow(
            () -> new ItemNotFoundException("Verification code not found")
        );
        log.info("IN findByVerificationCode - user: {} found by Verification Code: {}", user, code);
        user.setEmailConfirmed(true);
        user.setEmailConfirmCode("");
        userRepository.save(user);

        //TODO send email after confirm email
    }

    public void sendResetPassword(String email, HttpServletRequest httpRequest) {
        if (email == null || email.isEmpty()) {
            throw new ItemNotFoundException("User email not found");
        }
        User user = userRepository.findByEmail(email).orElseThrow(
            () -> new ItemNotFoundException("User email not found")
        );
        user.setEmailConfirmCode(UUID.randomUUID().toString());
        userRepository.save(user);
        String resetPasswordLink = constructUrlForResetPasswordEmailMessage(httpRequest, user);
        //TODO send email for reset password
    }

    private String constructUrlForConfirmEmailMessage(HttpServletRequest httpRequest, User user) {
        return httpRequest.getHeader(HttpHeaders.HOST) + "/v1/users/email/"
            + user.getEmailConfirmCode() + "/confirm";
    }

    private String constructUrlForResetPasswordEmailMessage(HttpServletRequest httpRequest,
        User user) {
        return httpRequest.getHeader(HttpHeaders.HOST) + "/v1/users/resetPassword/"
            + user.getEmailConfirmCode();
    }
}
