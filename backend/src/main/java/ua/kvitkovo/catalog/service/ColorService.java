package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.ItemNotUpdatedException;
import ua.kvitkovo.catalog.converter.ColorConverter;
import ua.kvitkovo.catalog.dto.ColorRequestDto;
import ua.kvitkovo.catalog.dto.ColorResponseDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.entity.Color;
import ua.kvitkovo.catalog.repository.ColorRepository;
import ua.kvitkovo.catalog.validator.ColorDtoValidator;
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
public class ColorService {

    private final ColorRepository colorRepository;
    private final ColorConverter colorConverter;
    private final ColorDtoValidator colorDtoValidator;
    private final ErrorUtils errorUtils;
    private final TransliterateUtils transliterateUtils;

    public Collection<ColorResponseDto> getAll() {
        List<Color> colors = colorRepository.findAll();
        return colors.stream()
                .map(colorConverter::convertToDto)
                .toList();
    }

    public ColorResponseDto findById(long id) throws ItemNotFoundException {
        Optional<Color> optional = colorRepository.findById(id);
        if (optional.isEmpty()) {
            throw new ItemNotFoundException("Color not found");
        }
        return colorConverter.convertToDto(optional.get());
    }

    public ColorResponseDto findByName(String name) throws ItemNotFoundException {
        Optional<Color> optional = colorRepository.findByName(name);
        if (optional.isEmpty()) {
            throw new ItemNotFoundException("Color not found");
        }
        return colorConverter.convertToDto(optional.get());
    }

    @Transactional
    public ColorResponseDto addColor(ColorRequestDto dto, BindingResult bindingResult) {
        try {
            ColorResponseDto byName = findByName(dto.getName());
            if(byName!=null){
                throw new ItemNotCreatedException("The color is already in the database");
            }
        } catch (ItemNotFoundException e){
            //nop
        }

        colorDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotCreatedException(errorUtils.getErrorsString(bindingResult));
        }
        Color color = colorConverter.convertToEntity(dto);
        color.setAlias(transliterateUtils.getAlias(Color.class.getSimpleName(), dto.getName()));
        colorRepository.save(color);
        log.info("The Color was created");
        return findById(color.getId());
    }

    @Transactional
    public ColorResponseDto updateColor(Long id, ColorRequestDto dto, BindingResult bindingResult) {
        ColorResponseDto colorResponseDto = findById(id);
        if (!Objects.equals(dto.getName(), colorResponseDto.getName())) {
            colorResponseDto.setAlias(transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, colorResponseDto, Helper.getNullPropertyNames(dto));

        Color color = colorConverter.convertToEntity(colorResponseDto);
        color.setId(id);

        colorDtoValidator.validate(dto, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ItemNotUpdatedException(errorUtils.getErrorsString(bindingResult));
        }

        colorRepository.save(color);
        return findById(id);
    }

    @Transactional
    public void deleteColor(long id) {
        ColorResponseDto colorResponseDto = findById(id);
        colorRepository.deleteById(colorResponseDto.getId());
    }
}
