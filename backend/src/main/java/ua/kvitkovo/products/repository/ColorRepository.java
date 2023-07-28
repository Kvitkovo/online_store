package ua.kvitkovo.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.kvitkovo.products.entity.Category;
import ua.kvitkovo.products.entity.Color;

import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
public interface ColorRepository extends JpaRepository<Color, Long> {

    Optional<Color> findByName(String name);
}
