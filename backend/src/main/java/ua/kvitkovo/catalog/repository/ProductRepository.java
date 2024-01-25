package ua.kvitkovo.catalog.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.catalog.dto.response.FilterPricesIntervalResponseDto;
import ua.kvitkovo.catalog.entity.*;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends ProductRepositoryBasic {

    Page<Product> findAllByCategoryInAndStatusEquals(Pageable pageable, List<Category> id,
                                                     ProductStatus status);

    Page<Product> findAllByDiscountGreaterThanAndStatusEquals(Pageable pageable,
                                                              BigDecimal discount, ProductStatus status);

    @Query("SELECT DISTINCT p.color FROM Product p WHERE p.category IN :categories AND p.status = :status")
    List<Color> findColorByCategoryIdAndStatus(
            @Param("categories") List<Category> categories,
            @Param("status") ProductStatus status
    );

    @Query("SELECT DISTINCT p.size FROM Product p WHERE p.category IN :categories AND p.status = :status")
    List<Size> findSizeByCategoryIdAndStatus(
            @Param("categories") List<Category> categories,
            @Param("status") ProductStatus status
    );

    @Query("SELECT DISTINCT p.productType FROM Product p WHERE p.category IN :categories AND p.status = :status")
    List<ProductType> findProductTypesByCategoryIdAndStatus(
            @Param("categories") List<Category> categories,
            @Param("status") ProductStatus status
    );

    @Query("SELECT p.color FROM Product p WHERE p.discount > 0 AND status = ?1")
    List<Color> findColorsByDiscountAndStatus(ProductStatus status);

    @Query("SELECT DISTINCT p.color FROM Product p WHERE status = ?1")
    List<Color> findColorsByStatus(ProductStatus status);

    @Query("SELECT p.size FROM Product p WHERE p.discount > 0 AND status = ?1")
    List<Size> findSizesByDiscountAndStatus(ProductStatus status);

    @Query("SELECT p.size FROM Product p WHERE status = ?1")
    List<Size> findSizesByStatus(ProductStatus status);

    @Query("SELECT p.productType FROM Product p WHERE p.discount > 0 AND status = ?1")
    List<ProductType> findProductTypesByDiscountAndStatus(ProductStatus status);

    @Query("SELECT p.productType FROM Product p WHERE status = ?1")
    List<ProductType> findProductTypesByStatus(ProductStatus status);

    @Query("SELECT p.category FROM Product p WHERE p.discount > 0 AND status = ?1")
    List<Category> findCategoriesByDiscountAndStatus(ProductStatus status);

    @Query("SELECT p.category FROM Product p WHERE status = ?1")
    List<Category> findCategoriesByStatus(ProductStatus status);

    @Query(
            value = """
                    SELECT
                    new ua.kvitkovo.catalog.dto.response.FilterPricesIntervalResponseDto(MIN(p.priceWithDiscount), MAX(p.priceWithDiscount))
                    FROM Product p
                    WHERE p.status = 'ACTIVE'
                          """)
    FilterPricesIntervalResponseDto getProductPriceRange();

    @Query(
            value = """
                    SELECT
                    new ua.kvitkovo.catalog.dto.response.FilterPricesIntervalResponseDto(MIN(p.priceWithDiscount), MAX(p.priceWithDiscount))
                    FROM Product p
                    WHERE p.status = 'ACTIVE' AND p.discount > 0
                          """)
    FilterPricesIntervalResponseDto getDiscountProductPriceRange();

    @Query(
            value = """
                    SELECT
                    new ua.kvitkovo.catalog.dto.response.FilterPricesIntervalResponseDto(MIN(p.priceWithDiscount), MAX(p.priceWithDiscount))
                    FROM Product p
                    WHERE p.status = 'ACTIVE' AND p.category IN ?1
                          """)
    FilterPricesIntervalResponseDto getProductByCategoryPriceRange(List<Category> categories);
}
