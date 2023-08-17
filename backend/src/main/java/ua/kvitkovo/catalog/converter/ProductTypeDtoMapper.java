package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.ProductTypeRequestDto;
import ua.kvitkovo.catalog.dto.ProductTypeResponseDto;
import ua.kvitkovo.catalog.entity.ProductType;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface ProductTypeDtoMapper {

    ProductTypeResponseDto mapEntityToDto(ProductType entity);

    ProductType mapDtoToEntity(ProductTypeResponseDto dto);

    ProductType mapDtoRequestToEntity(ProductTypeRequestDto dto);

    List<ProductTypeResponseDto> mapEntityToDto(List<ProductType> entities);
}
