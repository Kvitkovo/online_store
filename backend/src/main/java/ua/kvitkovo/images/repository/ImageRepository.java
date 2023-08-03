package ua.kvitkovo.images.repository;

import ua.kvitkovo.images.entity.Image;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface ImageRepository extends ImageRepositoryBasic {

    List<Image> findAllByProductIdOrderByMainImageDesc(Long id);
}
