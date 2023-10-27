package ua.kvitkovo.decor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ua.kvitkovo.decor.converter.DecorDtoMapper;
import ua.kvitkovo.decor.dto.DecorResponseDto;
import ua.kvitkovo.decor.repository.DecorRepository;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.users.service.UserService;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class DecorService {

    private final DecorRepository decorRepository;
    private final UserService userService;
    private final DecorDtoMapper decorDtoMapper;

    public DecorResponseDto findById(long id) throws ItemNotFoundException {
        DecorResponseDto decorResponseDto = decorRepository.findById(id)
                .map(decorDtoMapper::mapEntityToDto)
                .orElseThrow(() -> new ItemNotFoundException("Decor order not found"));

        if (!userService.isCurrentUserAdmin()
                && userService.getCurrentUserId() != decorResponseDto.getCustomerId()) {
            throw new ItemNotFoundException("Decor order not found");
        }
        return decorResponseDto;
    }

}
