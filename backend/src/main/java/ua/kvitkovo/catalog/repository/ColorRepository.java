package ua.kvitkovo.catalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.kvitkovo.catalog.entity.Color;

import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
public interface ColorRepository extends JpaRepository<Color, Long> {

    Optional<Color> findByName(String name);
}
