package ua.kvitkovo.decor.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.kvitkovo.decor.dto.DecorResponseDto;
import ua.kvitkovo.decor.entity.Decor;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DecorDtoMapper {

    Decor mapDtoToEntity(DecorResponseDto dto);

    @Mapping(target = "shopId", source = "shop.id")
    @Mapping(target = "managerId", source = "manager.id")
    @Mapping(target = "customerId", source = "customer.id")
    DecorResponseDto mapEntityToDto(Decor order);

    List<DecorResponseDto> mapEntityToDto(List<Decor> entities);
}
