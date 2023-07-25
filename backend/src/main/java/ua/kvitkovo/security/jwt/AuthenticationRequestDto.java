package ua.kvitkovo.security.jwt;

import lombok.Data;

/**
 * @author Andriy Gaponov
 */
@Data
public class AuthenticationRequestDto {

    private String email;
    private String password;
}
