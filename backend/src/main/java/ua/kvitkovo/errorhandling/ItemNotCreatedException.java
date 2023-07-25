package ua.kvitkovo.errorhandling;

/**
 * @author Andriy Gaponov
 */
public class ItemNotCreatedException extends RuntimeException{

    public ItemNotCreatedException(String message) {
        super(message);
    }
}
