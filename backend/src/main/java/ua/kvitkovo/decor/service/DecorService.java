package ua.kvitkovo.decor.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.decor.converter.DecorDtoMapper;
import ua.kvitkovo.decor.dto.DecorRequestDto;
import ua.kvitkovo.decor.dto.DecorResponseDto;
import ua.kvitkovo.decor.dto.DecorUpdateRequestDto;
import ua.kvitkovo.decor.entity.Decor;
import ua.kvitkovo.decor.entity.DecorStatus;
import ua.kvitkovo.decor.repository.DecorRepository;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.shop.entity.Shop;
import ua.kvitkovo.shop.repository.ShopRepository;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.repository.UserRepository;
import ua.kvitkovo.users.service.UserService;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class DecorService {

    private final DecorRepository decorRepository;
    private final ShopRepository shopRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final DecorDtoMapper decorDtoMapper;
    private final UserDtoMapper userDtoMapper;

    public DecorResponseDto findById(long id) throws ItemNotFoundException {
        return decorDtoMapper.mapEntityToDto(getDecor(id));
    }

    @Transactional
    public DecorResponseDto addDecor(DecorRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        Decor decor = decorDtoMapper.mapDtoRequestToEntity(dto);
        decor.setId(null);
        decor.setShop(getShop(dto.getShopId()));
        decor.setStatus(DecorStatus.NEW);

        try {
            UserResponseDto currentUser = userService.getCurrentUser();
            User customer = userDtoMapper.mapDtoToEntity(currentUser);
            decor.setCustomer(customer);
        } catch (Exception e) {
            log.info("A decor order was created by an unauthorized user");
        }

        decorRepository.save(decor);

        log.info("The Decor order was created");
        return decorDtoMapper.mapEntityToDto(decor);
    }

    @Transactional
    public List<DecorResponseDto> updateDecorStatus(List<Long> decorOrdersID, DecorStatus status) {
        List<Decor> decors = decorOrdersID.stream()
                .map(id -> getDecor(id))
                .toList();
        User manager = getUser(userService.getCurrentUserId());

        for (Decor decor : decors) {
            decor.setStatus(status);
            decor.setManager(manager);
            decorRepository.save(decor);
        }
        return decorDtoMapper.mapEntityToDto(decors);
    }

    public Page<DecorResponseDto> getAllDecorOrders(Pageable pageable) {
        Page<Decor> decors = decorRepository.findAll(pageable);
        if (decors.isEmpty()) {
            return Page.empty();
        } else {
            return decors.map(decorDtoMapper::mapEntityToDto);
        }
    }

    @Transactional
    public DecorResponseDto updateDecorOrder(Long id, DecorUpdateRequestDto dto,
                                             BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);

        DecorResponseDto decorResponseDto = findById(id);
        BeanUtils.copyProperties(dto, decorResponseDto, Helper.getNullPropertyNames(dto));

        Decor decor = decorDtoMapper.mapDtoToEntity(decorResponseDto);
        decor.setId(id);
        decor.setShop(getShop(dto.getShopId()));

        User manager = getUser(userService.getCurrentUserId());
        decor.setManager(manager);

        decorRepository.save(decor);
        return decorDtoMapper.mapEntityToDto(decor);
    }

    private Decor getDecor(long id) {
        return decorRepository.findById(id)
            .orElseThrow(() -> new ItemNotFoundException("Decor order not found"));
    }

    private Shop getShop(Long id) {
        return shopRepository.findById(id)
            .orElseThrow(() -> new ItemNotFoundException("Shop not found"));
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ItemNotFoundException("User not found"));
    }
}
