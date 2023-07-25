package ua.kvitkovo.users.converter;

import lombok.AllArgsConstructor;
import ua.kvitkovo.users.dto.UserRequestDto;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.Role;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.repository.RoleRepository;
import org.springframework.stereotype.Service;

/**
 * @author Andriy Gaponov
 */
@Service
@AllArgsConstructor
public class UserConverter {

    private final RoleRepository roleRepository;

    public UserResponseDto convertToDto(final User entity) {
        if (entity == null) {
            return null;
        }
        Role roleAdmin = roleRepository.findByName("ROLE_ADMIN");
        boolean isAdmin = entity.getRoles().contains(roleAdmin);

        return UserResponseDto.builder()
                .id(entity.getId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .phone(entity.getPhone())
                .email(entity.getEmail())
                .admin(isAdmin)
                .build();
    }

    public User convertToEntity(UserRequestDto dto) {
        if (dto == null) {
            return null;
        }
        return User.builder()
                .username(dto.getEmail())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .build();
    }

    public User convertToEntity(UserResponseDto dto) {
        if (dto == null) {
            return null;
        }
        return User.builder()
                .id(dto.getId())
                .username(dto.getEmail())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .build();
    }
}
