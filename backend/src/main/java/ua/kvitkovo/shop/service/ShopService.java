package ua.kvitkovo.shop.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.shop.converter.ShopMapper;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.shop.dto.ShopResponseDto;
import ua.kvitkovo.shop.entity.Shop;
import ua.kvitkovo.shop.repository.ShopRepository;
import ua.kvitkovo.shop.validator.ShopDtoValidator;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

import java.util.Objects;
import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final ShopMapper shopMapper;
    private final ShopDtoValidator shopDtoValidator;
    private final TransliterateUtils transliterateUtils;
    private final ErrorUtils errorUtils;

    public ShopResponseDto findById(long id) throws ItemNotFoundException {
        Optional<Shop> optional = shopRepository.findById(id);
        if (optional.isEmpty()) {
            throw new ItemNotFoundException("Shop not found");
        }
        return shopMapper.convertToDto(optional.get());
    }

    @Transactional
    public ShopResponseDto addShop(ShopRequestDto dto, BindingResult bindingResult) {
        shopDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }

        Shop shop = shopMapper.convertToEntity(dto);
        shop.setAlias(transliterateUtils.getAlias(Shop.class.getSimpleName(), dto.getTitle()));
        shopRepository.save(shop);
        log.info("The Shop was created");
        return findById(shop.getId());
    }

    public ShopResponseDto updateShop(Long id, ShopRequestDto dto, BindingResult bindingResult) {
        ShopResponseDto shopResponseDto = findById(id);
        if (!Objects.equals(dto.getTitle(), shopResponseDto.getTitle())){
            shopResponseDto.setAlias(transliterateUtils.getAlias(Shop.class.getSimpleName(), dto.getTitle()));
        }
        BeanUtils.copyProperties(dto, shopResponseDto, Helper.getNullPropertyNames(dto));

        Shop shop = shopMapper.convertToEntity(shopResponseDto);
        shop.setId(id);
        shopDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        shopRepository.save(shop);
        return findById(id);
    }
}
