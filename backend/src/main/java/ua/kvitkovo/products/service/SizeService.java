package ua.kvitkovo.products.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.products.converter.SizeConverter;
import ua.kvitkovo.products.dto.SizeRequestDto;
import ua.kvitkovo.products.dto.SizeResponseDto;
import ua.kvitkovo.products.entity.Category;
import ua.kvitkovo.products.entity.Size;
import ua.kvitkovo.products.repository.SizeRepository;
import ua.kvitkovo.products.validator.SizeDtoValidator;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class SizeService {

    private final SizeRepository sizeRepository;
    private final SizeConverter sizeConverter;
    private final SizeDtoValidator sizeDtoValidator;
    private final ErrorUtils errorUtils;
    private final TransliterateUtils transliterateUtils;

    public Collection<SizeResponseDto> getAll() {
        List<Size> sizes = sizeRepository.findAll();
        return sizes.stream()
                .map(sizeConverter::convertToDto)
                .toList();
    }

    public SizeResponseDto findById(long id) throws ItemNotFoundException {
        Optional<Size> optional = sizeRepository.findById(id);
        if (optional.isEmpty()) {
            throw new ItemNotFoundException("Size not found");
        }
        return sizeConverter.convertToDto(optional.get());
    }

    public List<SizeResponseDto> findByMinMax(int min, int max) throws ItemNotFoundException {
        List<Size> sizes = sizeRepository.findAllBetweenMinMax(min, max);
        return sizes.stream()
                .map(sizeConverter::convertToDto)
                .toList();
    }

    public List<SizeResponseDto> findByProductId(long id) throws ItemNotFoundException {
        //TODO get product by id
        List<Size> sizes = sizeRepository.findAllBetweenMinMax(0, 1000);
        return sizes.stream()
                .map(sizeConverter::convertToDto)
                .toList();
    }

    @Transactional
    public SizeResponseDto addSize(SizeRequestDto dto, BindingResult bindingResult) {
        sizeDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        Size size = sizeConverter.convertToEntity(dto);
        size.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        sizeRepository.save(size);
        log.info("The Size was created");
        return findById(size.getId());
    }

    @Transactional
    public SizeResponseDto updateSize(Long id, SizeRequestDto dto, BindingResult bindingResult) {
        SizeResponseDto sizeResponseDto = findById(id);
        if (!Objects.equals(dto.getName(), sizeResponseDto.getName())) {
            sizeResponseDto.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, sizeResponseDto, Helper.getNullPropertyNames(dto));

        Size size = sizeConverter.convertToEntity(sizeResponseDto);
        size.setId(id);

        sizeDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        sizeRepository.save(size);
        return findById(id);
    }

    @Transactional
    public void deleteSize(long id) {
        SizeResponseDto sizeResponseDto = findById(id);
        sizeRepository.deleteById(sizeResponseDto.getId());
    }
}
