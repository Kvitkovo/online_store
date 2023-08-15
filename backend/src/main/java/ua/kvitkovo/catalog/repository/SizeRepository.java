package ua.kvitkovo.catalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.kvitkovo.catalog.entity.Size;

import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
public interface SizeRepository extends JpaRepository<Size, Long> {

    @Query(nativeQuery = true, value = "select * FROM sizes s WHERE :height >= s.size_min AND :height <= s.size_max limit 1")
    Optional<Size> findFirstSizeByHeight(@Param("height") int height);
}
