package ua.kvitkovo.decor.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import ua.kvitkovo.decor.dto.DecorRequestDto;
import ua.kvitkovo.decor.dto.DecorResponseDto;
import ua.kvitkovo.decor.entity.Decor;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface DecorDtoMapper {

    Decor mapDtoRequestToEntity(DecorRequestDto dto);

    Decor mapDtoToEntity(DecorResponseDto dto);

    @Mappings({
            @Mapping(target = "shopId", source = "shop.id"),
            @Mapping(target = "managerId", source = "manager.id"),
            @Mapping(target = "customerId", source = "customer.id")
    })
    DecorResponseDto mapEntityToDto(Decor order);

    List<DecorResponseDto> mapEntityToDto(List<Decor> entities);
}
