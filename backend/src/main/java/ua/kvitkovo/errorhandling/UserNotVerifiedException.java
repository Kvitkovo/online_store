package ua.kvitkovo.errorhandling;

/**
 * @author Andriy Gaponov
 */
public class UserNotVerifiedException extends RuntimeException {


    public UserNotVerifiedException() {
    }

    public UserNotVerifiedException(String message) {
        super(message);
    }
}
