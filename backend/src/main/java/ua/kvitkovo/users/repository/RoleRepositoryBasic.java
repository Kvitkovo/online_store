package ua.kvitkovo.users.repository;

import ua.kvitkovo.users.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Andriy Gaponov
 */
public interface RoleRepositoryBasic extends JpaRepository<Role, Long> {
}
