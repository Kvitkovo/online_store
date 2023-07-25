package ua.kvitkovo.users.repository;

import ua.kvitkovo.users.entity.User;
import org.springframework.stereotype.Repository;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface UserRepository extends UserRepositoryBasic{

    User findByUsername(String name);
    User findByPhone(String phone);
    User findByEmail(String email);

}
