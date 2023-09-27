package ua.kvitkovo.users.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.users.entity.User;

import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface UserRepository extends UserRepositoryBasic {

    User findByUsername(String name);

    User findByPhone(String phone);

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailConfirmCode(String code);

    @Query("Select u from User u  LEFT JOIN u.roles r WHERE r.name = 'ROLE_USER'")
    Page<User> findAllClient(Pageable pageable);

    @Query("Select u from User u  LEFT JOIN u.roles r WHERE r.name <> 'ROLE_USER'")
    Page<User> findAllEmployees(Pageable pageable);
}
