package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.converter.SizeMapper;
import ua.kvitkovo.catalog.dto.SizeRequestDto;
import ua.kvitkovo.catalog.dto.SizeResponseDto;
import ua.kvitkovo.catalog.entity.Size;
import ua.kvitkovo.catalog.repository.SizeRepository;
import ua.kvitkovo.catalog.validator.SizeDtoValidator;
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
public class SizeService {

    private final SizeRepository sizeRepository;
    private final SizeMapper sizeMapper;
    private final SizeDtoValidator sizeDtoValidator;
    private final ErrorUtils errorUtils;
    private final TransliterateUtils transliterateUtils;

    public Collection<SizeResponseDto> getAll() {
        List<Size> sizes = sizeRepository.findAll();
        return sizeMapper.mapEntityToDto(sizes);
    }

    public SizeResponseDto findById(long id) throws ItemNotFoundException {
        return sizeRepository.findById(id)
                .map(sizeMapper::mapEntityToDto)
                .orElseThrow(() -> {
                    throw new ItemNotFoundException("Size not found");
                });
    }

    public SizeResponseDto findByProductByHeight(int height) throws ItemNotFoundException {
        return sizeRepository.findFirstSizeByHeight(height)
                .map(sizeMapper::mapEntityToDto)
                .orElse(null);
    }

    @Transactional
    public SizeResponseDto addSize(SizeRequestDto dto, BindingResult bindingResult) {
        sizeDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        SizeResponseDto sizeResponseDto = sizeMapper.mapDtoRequestToDto(dto);
        Size size = sizeMapper.mapDtoToEntity(sizeResponseDto);
        size.setAlias(transliterateUtils.getAlias(Size.class.getSimpleName(), dto.getName()));
        size.setId(null);
        sizeRepository.save(size);
        log.info("The Size was created");
        return sizeMapper.mapEntityToDto(size);
    }

    @Transactional
    public SizeResponseDto updateSize(Long id, SizeRequestDto dto, BindingResult bindingResult) {
        SizeResponseDto sizeResponseDto = findById(id);
        if (!Objects.equals(dto.getName(), sizeResponseDto.getName())) {
            sizeResponseDto.setAlias(transliterateUtils.getAlias(Size.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, sizeResponseDto, Helper.getNullPropertyNames(dto));

        Size size = sizeMapper.mapDtoToEntity(sizeResponseDto);
        sizeDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        sizeRepository.save(size);
        return sizeMapper.mapEntityToDto(size);
    }

    @Transactional
    public void deleteSize(long id) {
        SizeResponseDto sizeResponseDto = findById(id);
        sizeRepository.deleteById(sizeResponseDto.getId());
    }
}
