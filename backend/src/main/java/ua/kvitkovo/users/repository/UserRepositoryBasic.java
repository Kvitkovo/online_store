package ua.kvitkovo.users.repository;

import ua.kvitkovo.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Andriy Gaponov
 */
public interface UserRepositoryBasic extends JpaRepository<User, Long> {
}
