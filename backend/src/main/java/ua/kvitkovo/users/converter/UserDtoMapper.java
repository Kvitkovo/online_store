package ua.kvitkovo.users.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.users.dto.CreateUserRequestDto;
import ua.kvitkovo.users.dto.UserRequestDto;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface UserDtoMapper {

    UserResponseDto mapEntityToDto(User entity);

    User mapDtoToEntity(UserResponseDto dto);

    User mapDtoRequestToDto(UserRequestDto dto);
    User mapDtoRequestToDto(CreateUserRequestDto dto);

    List<UserResponseDto> mapEntityToDto(List<User> entities);
}
