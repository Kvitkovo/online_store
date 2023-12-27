package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.dto.request.ProductTypeRequestDto;
import ua.kvitkovo.catalog.entity.ProductType;
import ua.kvitkovo.catalog.repository.ProductTypeRepository;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

import java.util.List;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProductTypeService {

    private final ProductTypeRepository productTypeRepository;
    private final TransliterateUtils transliterateUtils;

    public List<ProductType> getAll() {
        return productTypeRepository.findAll();
    }

    public ProductType findById(long id) {
        return productTypeRepository.findById(id).orElseThrow(() -> {
            throw new ItemNotFoundException("Product type not found");
        });
    }

    @Transactional
    public ProductType addProductType(ProductTypeRequestDto dto,
                                      BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        ProductType type = new ProductType();
        BeanUtils.copyProperties(dto, type);
        type.setAlias(transliterateUtils.getAlias(ProductType.class.getSimpleName(), dto.getName()));
        type.setId(null);
        productTypeRepository.save(type);
        log.info("The Product type was created");
        return type;
    }

    @Transactional
    public ProductType updateProductType(Long id, ProductTypeRequestDto dto,
                                         BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);

        ProductType type = findById(id);
        if (!Objects.equals(dto.getName(), type.getName())) {
            type.setAlias(transliterateUtils.getAlias(ProductType.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, type, Helper.getNullPropertyNames(dto));

        productTypeRepository.save(type);
        return type;
    }

    @Transactional
    public void deleteProductType(long id) {
        ProductType type = findById(id);
        productTypeRepository.delete(type);
    }
}
