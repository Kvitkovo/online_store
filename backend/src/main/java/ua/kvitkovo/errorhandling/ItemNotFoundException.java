package ua.kvitkovo.errorhandling;

/**
 * @author Andriy Gaponov
 */
public class ItemNotFoundException extends RuntimeException{

    public ItemNotFoundException(String message) {
        super(message);
    }

    public ItemNotFoundException(Throwable cause) {
        super(cause);
    }
}
