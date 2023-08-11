package ua.kvitkovo.users.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.users.dto.UserRequestDto;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDto convertToDto(User user);

    UserResponseDto dtoToDto(ShopRequestDto dto);

    User convertToEntity(UserRequestDto dto);

    User convertToEntity(UserResponseDto dto);
}
