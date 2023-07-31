package ua.kvitkovo.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.kvitkovo.products.entity.Size;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
public interface SizeRepository extends JpaRepository<Size, Long> {

    @Query("FROM Size s WHERE s.min >= :minLength AND s.max <= :maxLength")
    List<Size> findAllBetweenMinMax(@Param("minLength") int min, @Param("maxLength") int max);
}
