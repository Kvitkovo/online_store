package ua.kvitkovo.catalog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.entity.Color;
import ua.kvitkovo.catalog.entity.ProductType;
import ua.kvitkovo.catalog.entity.Size;
import ua.kvitkovo.catalog.repository.ColorRepository;
import ua.kvitkovo.catalog.repository.ProductTypeRepository;
import ua.kvitkovo.catalog.repository.SizeRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Andriy Gaponov
 */
@Service
@RequiredArgsConstructor
public class FilterService {

    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;
    private final ProductTypeRepository productTypeRepository;

    public Map<String, Map<Long, ?>> getFilter() {

        List<Color> colors = colorRepository.findAll();
        List<Size> sizes = sizeRepository.findAll();
        List<ProductType> types = productTypeRepository.findAll();

        Map<Long, String> colorResult = new HashMap<>();
        Map<Long, String> sizeResult = new HashMap<>();
        Map<Long, String> typeResult = new HashMap<>();

        colors.forEach(color -> colorResult.put(color.getId(), color.getName()));
        sizes.forEach(size -> sizeResult.put(size.getId(), size.getName()));
        types.forEach(type -> typeResult.put(type.getId(), type.getName()));

        Map<String, Map<Long, ?>> map = new HashMap<>();
        map.put("Size", sizeResult);
        map.put("Color", colorResult);
        map.put("Types", typeResult);

        return map;
    }
}
