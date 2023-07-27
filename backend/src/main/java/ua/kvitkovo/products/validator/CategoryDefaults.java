package ua.kvitkovo.products.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.kvitkovo.products.dto.CategoryRequestDto;
import ua.kvitkovo.products.entity.CategoryStatus;

/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Service
public class CategoryDefaults {

    public void fillDefaultValues(CategoryRequestDto dto) {
        if (dto.getMetaDescription() == null) {
            dto.setMetaDescription("");
        }

        if (dto.getMetaKeywords() == null) {
            dto.setMetaKeywords("");
        }

        if (dto.getStatus() == null){
            dto.setStatus(CategoryStatus.ACTIVE);
        }
    }
}
