package ua.kvitkovo.security.jwt;

import jakarta.validation.constraints.NotBlank;
import lombok.Setter;

/**
 * @author Andriy Gaponov
 */
@Setter
public class AuthenticationGoogleRequestDto {

    @NotBlank
    private String token;

    public String getToken() {
        return token;
    }
}
