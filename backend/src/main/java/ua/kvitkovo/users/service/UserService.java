package ua.kvitkovo.users.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.security.jwt.JwtUser;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.entity.UserStatus;
import ua.kvitkovo.users.repository.UserRepository;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;


    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        log.info("IN getAll - {} users found", users.size());
        return userMapper.mapEntityToDto(users);
    }

    public User findByUsername(String username) throws ItemNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> {
                    throw new ItemNotFoundException("User email not found");
                });
        log.info("IN findByUsername - user: {} found by username: {}", user, username);
        return user;
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> {throw new ItemNotFoundException("User not found");});
    }

    public Page<UserResponseDto> getClientsByPage(Pageable pageable) {
        Page<User> users = userRepository.findAllClient(pageable);
        if (users.isEmpty()) {
            throw new ItemNotFoundException("Clients don't exist in the Data Base");
        }
        return users.map(userMapper::mapEntityToDto);
    }

    public void delete(Long id) {
        UserResponseDto userResponseDto = findById(id);
        userRepository.deleteById(userResponseDto.getId());
        log.info("IN delete - user with id: {} successfully deleted");
    }

    public User getCurrentUser() {
        JwtUser principal = (JwtUser) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
        return findById(principal.getId());
    }

    public Long getCurrentUserId() {
        JwtUser principal = (JwtUser) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
        return principal.getId();
    }

    public UserResponseDto enableUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new ItemNotFoundException("User not found");
        });
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);
        return userMapper.mapEntityToDto(user);
    }

    public UserResponseDto disableUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new ItemNotFoundException("User not found");
        });
        user.setStatus(UserStatus.NOT_ACTIVE);
        userRepository.save(user);
        return userMapper.mapEntityToDto(user);
    }

    public boolean isCurrentUserAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return true;
        }
        return false;
    }

    public Page<UserResponseDto> getEmployeesByPage(Pageable pageable) {
        Page<User> users = userRepository.findAllEmployees(pageable);
        if (users.isEmpty()) {
            throw new ItemNotFoundException("Employees don't exist in the Data Base");
        }
        return users.map(userMapper::mapEntityToDto);
    }
}
