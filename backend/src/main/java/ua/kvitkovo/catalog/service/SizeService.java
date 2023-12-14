package ua.kvitkovo.catalog.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.catalog.dto.request.SizeRequestDto;
import ua.kvitkovo.catalog.entity.Size;
import ua.kvitkovo.catalog.repository.SizeRepository;
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
public class SizeService {

    private final SizeRepository sizeRepository;
    private final TransliterateUtils transliterateUtils;

    public List<Size> getAll() {
        return sizeRepository.findAll();
    }

    public Size findById(long id) {
        return sizeRepository.findById(id)
                .orElseThrow(() -> {
                    throw new ItemNotFoundException("Size not found");
                });
    }

    @Transactional
    public Size addSize(SizeRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        Size size = new Size();
        BeanUtils.copyProperties(dto, size);
        size.setAlias(transliterateUtils.getAlias(Size.class.getSimpleName(), dto.getName()));
        size.setId(null);
        sizeRepository.save(size);
        log.info("The Size was created");
        return size;
    }

    @Transactional
    public Size updateSize(Long id, SizeRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotUpdatedException(bindingResult);

        Size size = findById(id);
        if (!Objects.equals(dto.getName(), size.getName())) {
            size.setAlias(transliterateUtils.getAlias(Size.class.getSimpleName(), dto.getName()));
        }
        BeanUtils.copyProperties(dto, size, Helper.getNullPropertyNames(dto));

        sizeRepository.save(size);
        return size;
    }

    @Transactional
    public void deleteSize(long id) {
        Size size = findById(id);
        sizeRepository.delete(size);
    }
}
