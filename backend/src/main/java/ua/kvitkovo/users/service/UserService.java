package ua.kvitkovo.users.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.security.jwt.JwtUser;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.UserRequestDto;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.Role;
import ua.kvitkovo.users.entity.Status;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.repository.RoleRepository;
import ua.kvitkovo.users.repository.UserRepository;
import ua.kvitkovo.users.validator.UserRequestDtoValidator;
import ua.kvitkovo.utils.ErrorUtils;

import java.util.ArrayList;
import java.util.List;

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

    public UserResponseDto register(UserRequestDto userRequestDto, BindingResult bindingResult) {
        userRequestDtoValidator.setUserService(this);
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
        user.setStatus(Status.ACTIVE);
        user.setId(null);

        User registeredUser = userRepository.save(user);

        log.info("IN register - user: {} successfully registered", registeredUser);
        return userMapper.mapEntityToDto(registeredUser);
    }

    public List<User> getAll() {
        List<User> result = userRepository.findAll();
        log.info("IN getAll - {} users found", result.size());
        return result;
    }

    public User findByUsername(String username) {
        User result = userRepository.findByEmail(username);
        log.info("IN findByUsername - user: {} found by username: {}", result, username);
        return result;
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

    public void delete(Long id) {
        userRepository.deleteById(id);
        log.info("IN delete - user with id: {} successfully deleted");
    }

    public User getCurrentUser() {
        JwtUser principal = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return findById(principal.getId());
    }
}
