package ua.kvitkovo.errorhandling;

/**
 * @author Andriy Gaponov
 */
public class AccessDeniedException extends RuntimeException {


    public AccessDeniedException() {
    }

    public AccessDeniedException(String message) {
        super(message);
    }
}
