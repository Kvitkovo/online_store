package ua.kvitkovo.catalog.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.catalog.dto.request.ProductTypeRequestDto;
import ua.kvitkovo.catalog.dto.response.ProductTypeResponseDto;
import ua.kvitkovo.catalog.entity.ProductType;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductTypeDtoMapper {

    ProductTypeResponseDto mapEntityToDto(ProductType entity);

    ProductType mapDtoToEntity(ProductTypeResponseDto dto);

    List<ProductTypeResponseDto> mapEntityToDto(List<ProductType> entities);
}
