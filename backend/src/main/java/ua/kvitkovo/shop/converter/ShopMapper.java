package ua.kvitkovo.shop.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.kvitkovo.shop.dto.ShopRequestDto;
import ua.kvitkovo.shop.dto.ShopResponseDto;
import ua.kvitkovo.shop.entity.Shop;
import ua.kvitkovo.utils.Mapper;

/**
 * @author Andriy Gaponov
 */
@Service
public class ShopMapper implements Mapper<Shop, ShopResponseDto, ShopRequestDto> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ShopResponseDto mapEntityToDto(Shop source) throws RuntimeException {
        ShopResponseDto responseDto = modelMapper.map(source, ShopResponseDto.class);
        return responseDto;
    }

    @Override
    public Shop mapDtoToEntity(ShopResponseDto source) throws RuntimeException {
        Shop entity = modelMapper.map(source, Shop.class);
        return entity;
    }

    @Override
    public ShopResponseDto mapDtoRequestToDto(ShopRequestDto source) throws RuntimeException {
        ShopResponseDto responseDto = modelMapper.map(source, ShopResponseDto.class);
        return responseDto;
    }
}
