package ua.kvitkovo.users.repository;

import ua.kvitkovo.users.entity.Role;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface RoleRepository extends RoleRepositoryBasic {

    Optional<Role> findByName(String name);
}
