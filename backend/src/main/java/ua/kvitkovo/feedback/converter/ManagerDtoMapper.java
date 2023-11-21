package ua.kvitkovo.feedback.converter;

import java.util.List;
import org.mapstruct.Mapper;
import ua.kvitkovo.feedback.dto.ManagerResponseDto;
import ua.kvitkovo.users.entity.User;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface ManagerDtoMapper {

    ManagerResponseDto mapEntityToDto(User user);

    List<ManagerResponseDto> mapEntityToDto(List<User> users);
}
