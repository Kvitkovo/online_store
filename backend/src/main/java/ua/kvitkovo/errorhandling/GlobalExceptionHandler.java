package ua.kvitkovo.errorhandling;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;

/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserNotVerifiedException.class)
    private ResponseEntity<ErrorResponse> handleException(UserNotVerifiedException exception) {
        ErrorResponse response = new ErrorResponse(
                exception.getMessage(),
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    private ResponseEntity<ErrorResponse> handleException(AccessDeniedException exception) {
        ErrorResponse response = new ErrorResponse(
                "You don't have required role to perform this action.",
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(BadCredentialsException.class)
    private ResponseEntity<ErrorResponse> handleException(BadCredentialsException exception) {
        ErrorResponse response = new ErrorResponse(
                "Bad credentials",
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    private ResponseEntity<ErrorResponse> handleException(IllegalArgumentException exception) {
        ErrorResponse response = new ErrorResponse(
                "Illegal argument",
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ItemNotFoundException.class)
    private ResponseEntity<ErrorResponse> handleException(ItemNotFoundException exception) {
        ErrorResponse response = new ErrorResponse(
                exception.getMessage(),
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    private ResponseEntity<ErrorResponse> handleException(UsernameNotFoundException exception) {
        ErrorResponse response = new ErrorResponse(
                exception.getMessage(),
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handleException(ItemNotCreatedException exception) {
        ErrorResponse response = new ErrorResponse(
                exception.getMessage(), System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handleException(SQLIntegrityConstraintViolationException exception) {
        ErrorResponse response = new ErrorResponse(
                exception.getMessage(), System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handleException(ItemNotUpdatedException exception) {
        ErrorResponse response = new ErrorResponse(
                exception.getMessage(), System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException exception,
            HttpHeaders headers, HttpStatusCode status,
            WebRequest request) {
        ErrorResponse response = new ErrorResponse(
                exception.getMessage(), System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status,
            WebRequest request) {
        ErrorResponse response = new ErrorResponse(
                ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage(),
                System.currentTimeMillis()
        );
        return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }
}
