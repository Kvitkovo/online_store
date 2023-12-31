package ua.kvitkovo.security.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.errorhandling.UserNotFoundException;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserService;

/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Service
@Slf4j
public class JwtUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userService.findByUsername(username);
            JwtUser jwtUser = JwtUserFactory.create(user);
            log.info("IN loadUserByUsername - user with username: {} successfully loaded", username);
            return jwtUser;
        } catch (ItemNotFoundException e) {
            throw new UsernameNotFoundException("User with username: " + username + " not found");
        }
    }
}
