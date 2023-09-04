package ua.kvitkovo.errorhandling;

import org.springframework.security.core.AuthenticationException;

/**
 * @author Andriy Gaponov
 */
public class UserNotFoundException extends AuthenticationException {

    public UserNotFoundException(String msg) {
        super(msg);
    }
}
