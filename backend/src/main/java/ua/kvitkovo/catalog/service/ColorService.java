package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.converter.ColorDtoMapper;
import ua.kvitkovo.catalog.dto.request.ColorRequestDto;
import ua.kvitkovo.catalog.dto.response.ColorResponseDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.entity.Color;
import ua.kvitkovo.catalog.repository.ColorRepository;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ColorService {

    private final ColorRepository colorRepository;
    private final ColorDtoMapper colorMapper;
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
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        colorRepository.findByName(dto.getName())
            .ifPresent(color -> {
                throw new ItemNotCreatedException("The color is already in the database");
            });

        Color color = colorMapper.mapDtoRequestToEntity(dto);
        color.setAlias(transliterateUtils.getAlias(Color.class.getSimpleName(), dto.getName()));
        color.setId(null);
        colorRepository.save(color);
        log.info("The Color was created");
        return colorMapper.mapEntityToDto(color);
    }

    @Transactional
    public ColorResponseDto updateColor(Long id, ColorRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);

        ColorResponseDto colorResponseDto = findById(id);
        if (!Objects.equals(dto.getName(), colorResponseDto.getName())) {
            colorResponseDto.setAlias(
                transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, colorResponseDto, Helper.getNullPropertyNames(dto));

        Color color = colorMapper.mapDtoToEntity(colorResponseDto);
        colorRepository.save(color);
        return colorMapper.mapEntityToDto(color);
    }

    @Transactional
    public void deleteColor(long id) {
        ColorResponseDto colorResponseDto = findById(id);
        colorRepository.deleteById(colorResponseDto.getId());
    }
}
