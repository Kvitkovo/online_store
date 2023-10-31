package ua.kvitkovo.shop.service;

import jakarta.transaction.Transactional;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.shop.converter.ShopDtoMapper;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.shop.dto.ShopResponseDto;
import ua.kvitkovo.shop.entity.Shop;
import ua.kvitkovo.shop.repository.ShopRepository;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final ShopDtoMapper shopMapper;
    private final TransliterateUtils transliterateUtils;

    public ShopResponseDto findById(long id) throws ItemNotFoundException {
        return shopRepository.findById(id).map(shopMapper::mapEntityToDto)
            .orElseThrow(() -> new ItemNotFoundException("Shop not found"));
    }

    @Transactional
    public ShopResponseDto addShop(ShopRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        Shop shop = shopMapper.mapDtoRequestToDto(dto);
        shop.setAlias(transliterateUtils.getAlias(Shop.class.getSimpleName(), dto.getTitle()));
        shop.setId(null);
        shopRepository.save(shop);
        log.info("The Shop was created");
        return shopMapper.mapEntityToDto(shop);
    }

    public ShopResponseDto updateShop(Long id, ShopRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);

        ShopResponseDto shopResponseDto = findById(id);
        if (!Objects.equals(dto.getTitle(), shopResponseDto.getTitle())) {
            shopResponseDto.setAlias(
                transliterateUtils.getAlias(Shop.class.getSimpleName(), dto.getTitle()));
        }
        BeanUtils.copyProperties(dto, shopResponseDto, Helper.getNullPropertyNames(dto));
        Shop shop = shopMapper.mapDtoToEntity(shopResponseDto);

        shopRepository.save(shop);
        return shopMapper.mapEntityToDto(shop);
    }
}
