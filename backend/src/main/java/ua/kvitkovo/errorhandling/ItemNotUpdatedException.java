package ua.kvitkovo.errorhandling;

/**
 * @author Andriy Gaponov
 */
public class ItemNotUpdatedException extends RuntimeException{

    public ItemNotUpdatedException(String message) {
        super(message);
    }
}
