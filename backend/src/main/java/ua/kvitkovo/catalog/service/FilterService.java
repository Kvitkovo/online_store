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
    private final ProductService productService;

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

    public Map<String, Map<Long, ?>> getFilterOnlyActiveProductByCategoryId(long id) {

        List<Color> colors = productService.getAllColorsIdByCategory(id);
        List<Size> sizes = productService.getAllSizesIdByCategory(id);
        List<ProductType> types = productService.getAllProductTypesIdByCategory(id);

        Map<String, Map<Long, ?>> map = new HashMap<>();

        if (!sizes.isEmpty()){
            Map<Long, String> sizeResult = new HashMap<>();
            sizes.forEach(size -> sizeResult.put(size.getId(), size.getName()));
            map.put("Size", sizeResult);
        }

        if(!colors.isEmpty()){
            Map<Long, String> colorResult = new HashMap<>();
            colors.forEach(color -> colorResult.put(color.getId(), color.getName()));
            map.put("Color", colorResult);
        }

        if(!types.isEmpty()){
            Map<Long, String> typeResult = new HashMap<>();
            types.forEach(type -> typeResult.put(type.getId(), type.getName()));
            map.put("Types", typeResult);
        }
        return map;
    }
}
