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

    private final ProductService productService;

    private static FilterPricesIntervalResponseDto getPricesIntervalResponseDto(Product minPriceProduct, Product maxPriceProduct) {
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

    public Map<String, Object> getFilter() {
        List<Color> colors = productService.getAllColorsByProducts();
        List<Size> sizes = productService.getAllSizesByProducts();
        List<ProductType> types = productService.getAllProductTypesByProducts();
        List<Category> categories = productService.getAllCategoriesByProducts();
        Map<String, Object> filter = createFilter(colors, sizes, types);

        if (!categories.isEmpty()) {
            Map<Long, String> sizeResult = new HashMap<>();
            categories.forEach(size -> sizeResult.put(size.getId(), size.getName()));
            filter.put("Categories", sizeResult);
        }

        filter.put("Prices", productService.getProductPriceRange());

        return filter;
    }

    public Map<String, Object> getFilterOnlyActiveProductByCategoryId(long id) {
        List<Color> colors = productService.getAllColorsIdByCategory(id);
        List<Size> sizes = productService.getAllSizesIdByCategory(id);
        List<ProductType> types = productService.getAllProductTypesIdByCategory(id);
        Map<String, Object> filter = createFilter(colors, sizes, types);

        List<Category> categories = productService.getCategoriesWithChildren(id);
        filter.put("Prices", productService.getProductByCategoryPriceRange(categories));
        return filter;
    }

    public Map<String, Object> getFilterOnlyActiveProductByDiscount() {
        List<Color> colors = productService.getAllColorsIdByDiscount();
        List<Size> sizes = productService.getAllSizesIdByDiscount();
        List<ProductType> types = productService.getAllProductTypesIdByDiscount();
        List<Category> categories = productService.getAllCategoriesByDiscount();

        Map<String, Object> filter = createFilter(colors, sizes, types);

        if (!categories.isEmpty()) {
            Map<Long, String> sizeResult = new HashMap<>();
            categories.forEach(size -> sizeResult.put(size.getId(), size.getName()));
            filter.put("Categories", sizeResult);
        }

        filter.put("Prices", productService.getDiscountProductPriceRange());
        return filter;
    }

    private Map<String, Object> createFilter(List<Color> colors, List<Size> sizes, List<ProductType> types) {
        Map<String, Object> map = new HashMap<>();

        if (!sizes.isEmpty()) {
            Map<Long, String> sizeResult = new HashMap<>();
            sizes.forEach(size -> sizeResult.put(size.getId(), size.getName()));
            map.put("Sizes", sizeResult);
        }

        if (!colors.isEmpty()) {
            Map<Long, String> colorResult = new HashMap<>();
            colors.forEach(color -> colorResult.put(color.getId(), color.getName()));
            map.put("Colors", colorResult);
        }

        if (!types.isEmpty()) {
            Map<Long, String> typeResult = new HashMap<>();
            types.forEach(type -> typeResult.put(type.getId(), type.getName()));
            map.put("Types", typeResult);
        }
        return map;
    }
}
