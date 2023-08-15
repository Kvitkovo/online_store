package ua.kvitkovo.security.jwt;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Setter;

/**
 * @author Andriy Gaponov
 */
@Setter
public class AuthenticationRequestDto {

    @NotBlank
    private String email;
    @NotBlank
    private String password;

    @Schema(example = "andriy@mail.com", description = "User email")
    public String getEmail() {
        return email;
    }

    @Schema(example = "Password", description = "User password")
    public String getPassword() {
        return password;
    }
}
