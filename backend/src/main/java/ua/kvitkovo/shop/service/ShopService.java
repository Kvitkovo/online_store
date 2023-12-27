package ua.kvitkovo.shop.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.shop.entity.Shop;
import ua.kvitkovo.shop.repository.ShopRepository;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final TransliterateUtils transliterateUtils;

    public Shop findById(long id) throws ItemNotFoundException {
        return shopRepository.findById(id).orElseThrow(() -> new ItemNotFoundException("Shop not found"));
    }

    @Transactional
    public Shop addShop(ShopRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        Shop shop = new Shop();
        BeanUtils.copyProperties(dto, shop);
        shop.setAlias(transliterateUtils.getAlias(Shop.class.getSimpleName(), dto.getTitle()));
        shop.setId(null);
        shopRepository.save(shop);
        log.debug("The Shop was created");
        return shop;
    }

    public Shop updateShop(Long id, ShopRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);

        Shop shop = findById(id);
        if (!Objects.equals(dto.getTitle(), shop.getTitle())) {
            shop.setAlias(transliterateUtils.getAlias(Shop.class.getSimpleName(), dto.getTitle()));
        }
        BeanUtils.copyProperties(dto, shop, Helper.getNullPropertyNames(dto));

        shopRepository.save(shop);
        return shop;
    }
}
