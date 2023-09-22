package ua.kvitkovo.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.kvitkovo.users.entity.Position;

/**
 * @author Andriy Gaponov
 */
public interface PositionRepository extends JpaRepository<Position, Long> {
}
