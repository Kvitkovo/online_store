package ua.kvitkovo.users.repository;

import ua.kvitkovo.users.entity.Role;
import org.springframework.stereotype.Repository;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface RoleRepository extends RoleRepositoryBasic {

    Role findByName(String name);
}
