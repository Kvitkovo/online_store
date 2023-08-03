package ua.kvitkovo.images.repository;

import ua.kvitkovo.images.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Andriy Gaponov
 */
public interface ImageRepositoryBasic extends JpaRepository<Image, Long> {
}
