package ua.kvitkovo.users.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.users.entity.User;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface UserRepository extends UserRepositoryBasic {

    User findByUsername(String name);

    User findByPhone(String phone);

    User findByEmail(String email);
    Optional<User> findByEmailConfirmCode(String code);

    @Query("Select u from User u  LEFT JOIN u.roles r WHERE r.name = 'ROLE_USER'")
    Page<User> findAllClient(Pageable pageable);
}
