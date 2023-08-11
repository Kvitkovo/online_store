package ua.kvitkovo.users.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.kvitkovo.users.dto.UserRequestDto;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.repository.RoleRepository;
import ua.kvitkovo.utils.Mapper;

/**
 * @author Andriy Gaponov
 */
@Service
public class UserMapper implements Mapper<User, UserResponseDto, UserRequestDto> {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserResponseDto mapEntityToDto(User source) throws RuntimeException {
        UserResponseDto responseDto = modelMapper.map(source, UserResponseDto.class);
        responseDto.setAdmin(source.getRoles().contains(roleRepository.findByName("ROLE_ADMIN")));
        return responseDto;
    }

    @Override
    public User mapDtoToEntity(UserResponseDto source) throws RuntimeException {
        User entity = modelMapper.map(source, User.class);
        return entity;
    }

    @Override
    public UserResponseDto mapDtoRequestToDto(UserRequestDto source) throws RuntimeException {
        UserResponseDto responseDto = modelMapper.map(source, UserResponseDto.class);
        return responseDto;
    }
}
