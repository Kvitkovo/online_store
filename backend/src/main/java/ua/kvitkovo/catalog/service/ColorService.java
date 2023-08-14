package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.converter.ColorMapper;
import ua.kvitkovo.catalog.dto.ColorRequestDto;
import ua.kvitkovo.catalog.dto.ColorResponseDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.entity.Color;
import ua.kvitkovo.catalog.repository.ColorRepository;
import ua.kvitkovo.catalog.validator.ColorDtoValidator;
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
public class ColorService {

    private final ColorRepository colorRepository;
    private final ColorMapper colorMapper;
    private final ColorDtoValidator colorDtoValidator;
    private final ErrorUtils errorUtils;
    private final TransliterateUtils transliterateUtils;

    public Collection<ColorResponseDto> getAll() {
        List<Color> colors = colorRepository.findAll();
        return colorMapper.mapEntityToDto(colors);
    }

    public ColorResponseDto findById(long id) throws ItemNotFoundException {
        return colorRepository.findById(id)
                .map(colorMapper::mapEntityToDto)
                .orElseThrow(() -> new ItemNotFoundException("Color not found"));
    }

    public ColorResponseDto findByName(String name) throws ItemNotFoundException {
        return colorRepository.findByName(name)
                .map(colorMapper::mapEntityToDto)
                .orElseThrow(() -> new ItemNotFoundException("Color not found"));
    }

    @Transactional
    public ColorResponseDto addColor(ColorRequestDto dto, BindingResult bindingResult) {
        colorRepository.findByName(dto.getName())
                .ifPresent(color -> {
                    throw new ItemNotCreatedException("The color is already in the database");
                });

        colorDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        ColorResponseDto colorResponseDto = colorMapper.mapDtoRequestToDto(dto);
        Color color = colorMapper.mapDtoToEntity(colorResponseDto);
        color.setAlias(transliterateUtils.getAlias(Color.class.getSimpleName(), dto.getName()));
        color.setId(null);
        colorRepository.save(color);
        log.info("The Color was created");
        return colorMapper.mapEntityToDto(color);
    }

    @Transactional
    public ColorResponseDto updateColor(Long id, ColorRequestDto dto, BindingResult bindingResult) {
        ColorResponseDto colorResponseDto = findById(id);
        if (!Objects.equals(dto.getName(), colorResponseDto.getName())) {
            colorResponseDto.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, colorResponseDto, Helper.getNullPropertyNames(dto));

        Color color = colorMapper.mapDtoToEntity(colorResponseDto);
        colorDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        colorRepository.save(color);
        return colorMapper.mapEntityToDto(color);
    }

    @Transactional
    public void deleteColor(long id) {
        ColorResponseDto colorResponseDto = findById(id);
        colorRepository.deleteById(colorResponseDto.getId());
    }
}
