package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.converter.ProductTypeDtoMapper;
import ua.kvitkovo.catalog.dto.ProductTypeRequestDto;
import ua.kvitkovo.catalog.dto.ProductTypeResponseDto;
import ua.kvitkovo.catalog.entity.ProductType;
import ua.kvitkovo.catalog.repository.ProductTypeRepository;
import ua.kvitkovo.catalog.validator.ProductTypeDtoValidator;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ProductTypeService {

    private final ProductTypeRepository productTypeRepository;
    private final ProductTypeDtoMapper productTypeMapper;
    private final ProductTypeDtoValidator productTypeDtoValidator;
    private final ErrorUtils errorUtils;
    private final TransliterateUtils transliterateUtils;

    public Collection<ProductTypeResponseDto> getAll() {
        List<ProductType> types = productTypeRepository.findAll();
        return productTypeMapper.mapEntityToDto(types);
    }

    public ProductTypeResponseDto findById(long id) throws ItemNotFoundException {
        return productTypeRepository.findById(id)
                .map(productTypeMapper::mapEntityToDto).orElseThrow(() -> {
                    throw new ItemNotFoundException("Product type not found");
                });
    }

    @Transactional
    public ProductTypeResponseDto addProductType(ProductTypeRequestDto dto, BindingResult bindingResult) {
        productTypeDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        ProductType type = productTypeMapper.mapDtoRequestToEntity(dto);
        type.setAlias(transliterateUtils.getAlias(ProductType.class.getSimpleName(), dto.getName()));
        type.setId(null);
        productTypeRepository.save(type);
        log.info("The Product type was created");
        return productTypeMapper.mapEntityToDto(type);
    }

    @Transactional
    public ProductTypeResponseDto updateProductType(Long id, ProductTypeRequestDto dto, BindingResult bindingResult) {
        ProductTypeResponseDto productTypeResponseDto = findById(id);
        if (!Objects.equals(dto.getName(), productTypeResponseDto.getName())) {
            productTypeResponseDto.setAlias(transliterateUtils.getAlias(ProductType.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, productTypeResponseDto, Helper.getNullPropertyNames(dto));

        ProductType type = productTypeMapper.mapDtoToEntity(productTypeResponseDto);
        productTypeDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        productTypeRepository.save(type);
        return productTypeMapper.mapEntityToDto(type);
    }

    @Transactional
    public void deleteProductType(long id) {
        ProductTypeResponseDto productTypeResponseDto = findById(id);
        productTypeRepository.deleteById(productTypeResponseDto.getId());
    }
}