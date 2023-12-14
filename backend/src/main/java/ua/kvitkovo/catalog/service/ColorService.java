package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.dto.request.ColorRequestDto;
import ua.kvitkovo.catalog.entity.Category;
import ua.kvitkovo.catalog.entity.Color;
import ua.kvitkovo.catalog.repository.ColorRepository;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;
import ua.kvitkovo.utils.TransliterateUtils;

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
    private final TransliterateUtils transliterateUtils;

    public List<Color> getAll() {
        return colorRepository.findAll();
    }

    public Color findById(long id) throws ItemNotFoundException {
        return colorRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Color not found"));
    }

    public Color findByName(String name) throws ItemNotFoundException {
        return colorRepository.findByName(name)
                .orElseThrow(() -> new ItemNotFoundException("Color not found"));
    }

    @Transactional
    public Color addColor(ColorRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        colorRepository.findByName(dto.getName())
                .ifPresent(color -> {
                    throw new ItemNotCreatedException("The color is already in the database");
                });

        Color color = new Color();
        BeanUtils.copyProperties(dto, color);
        color.setAlias(transliterateUtils.getAlias(Color.class.getSimpleName(), dto.getName()));
        color.setId(null);
        colorRepository.save(color);
        log.debug("The Color was created");
        return color;
    }

    @Transactional
    public Color updateColor(Long id, ColorRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);

        Color color = findById(id);
        if (!Objects.equals(dto.getName(), color.getName())) {
            color.setAlias(
                    transliterateUtils.getAlias(Category.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, color, Helper.getNullPropertyNames(dto));

        colorRepository.save(color);
        return color;
    }

    @Transactional
    public void deleteColor(long id) {
        Color color = findById(id);
        colorRepository.delete(color);
    }
}
