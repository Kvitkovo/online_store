package ua.kvitkovo.catalog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.kvitkovo.catalog.dto.response.FilterPricesIntervalResponseDto;
import ua.kvitkovo.catalog.entity.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FilterService {

    private final ColorService colorService;
    private final SizeService sizeService;
    private final ProductTypeService productTypeService;
    private final ProductService productService;

    public Map<String, Map<Long, ?>> getFilter() {

        List<Color> colors = colorService.getAll();
        List<Size> sizes = sizeService.getAll();
        List<ProductType> types = productTypeService.getAll();

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

        if (!sizes.isEmpty()) {
            Map<Long, String> sizeResult = new HashMap<>();
            sizes.forEach(size -> sizeResult.put(size.getId(), size.getName()));
            map.put("Size", sizeResult);
        }

        if (!colors.isEmpty()) {
            Map<Long, String> colorResult = new HashMap<>();
            colors.forEach(color -> colorResult.put(color.getId(), color.getName()));
            map.put("Color", colorResult);
        }

        if (!types.isEmpty()) {
            Map<Long, String> typeResult = new HashMap<>();
            types.forEach(type -> typeResult.put(type.getId(), type.getName()));
            map.put("Types", typeResult);
        }
        return map;
    }

    public FilterPricesIntervalResponseDto getMinMaxPricesProductsInCategory(Long categoryId) {
        Product minPriceProduct = productService.findFirstByCategoryIdAndStatusOrderByPriceAsc(
                categoryId, ProductStatus.ACTIVE);
        Product maxPriceProduct = productService.findFirstByCategoryIdAndStatusOrderByPriceDesc(
                categoryId, ProductStatus.ACTIVE);
        FilterPricesIntervalResponseDto result = new FilterPricesIntervalResponseDto();
        if (minPriceProduct == null) {
            result.setMinPrice(BigDecimal.ZERO);
        } else {
            result.setMinPrice(minPriceProduct.getPrice());
        }
        if (maxPriceProduct == null) {
            result.setMaxPrice(BigDecimal.ZERO);
        } else {
            result.setMaxPrice(maxPriceProduct.getPrice());
        }
        return result;
    }
}
