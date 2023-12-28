package ua.kvitkovo.decor.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.decor.dto.DecorRequestDto;
import ua.kvitkovo.decor.dto.DecorUpdateRequestDto;
import ua.kvitkovo.decor.entity.Decor;
import ua.kvitkovo.decor.entity.DecorStatus;
import ua.kvitkovo.decor.repository.DecorRepository;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.shop.service.ShopService;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserService;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class DecorService {

    private final DecorRepository decorRepository;
    private final ShopService shopService;
    private final UserService userService;

    public Decor findById(long id) throws ItemNotFoundException {
        return decorRepository.findById(id).orElseThrow(() -> new ItemNotFoundException("Decor order not found"));
    }

    @Transactional
    public Decor addDecor(DecorRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        Decor decor = new Decor();
        BeanUtils.copyProperties(dto, decor);
        decor.setId(null);
        decor.setShop(shopService.findById(dto.getShopId()));
        decor.setStatus(DecorStatus.NEW);

        try {
            decor.setCustomer(userService.getCurrentUser());
        } catch (Exception e) {
            log.debug("A decor order was created by an unauthorized user");
        }

        decorRepository.save(decor);

        log.debug("The Decor order was created");
        return decor;
    }

    @Transactional
    public List<Decor> updateDecorStatus(List<Long> decorOrdersID, DecorStatus status) {
        List<Decor> decors = decorOrdersID.stream()
                .map(this::findById)
                .toList();
        User manager = userService.getCurrentUser();

        for (Decor decor : decors) {
            decor.setStatus(status);
            decor.setManager(manager);
            decorRepository.save(decor);
        }
        return decors;
    }

    public Page<Decor> getAllDecorOrders(Pageable pageable) {
        Page<Decor> decors = decorRepository.findAll(pageable);
        if (decors.isEmpty()) {
            return Page.empty();
        } else {
            return decors;
        }
    }

    @Transactional
    public Decor updateDecorOrder(Long id, DecorUpdateRequestDto dto,
                                             BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);

        Decor decor = findById(id);
        BeanUtils.copyProperties(dto, decor, Helper.getNullPropertyNames(dto));
        decor.setId(id);
        decor.setShop(shopService.findById(dto.getShopId()));

        User manager = userService.getCurrentUser();
        decor.setManager(manager);

        decorRepository.save(decor);
        return decor;
    }
}
