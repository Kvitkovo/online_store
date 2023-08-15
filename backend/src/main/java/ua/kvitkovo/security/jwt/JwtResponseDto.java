package ua.kvitkovo.security.jwt;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDto {

    private String email;
    private String token;

    @Schema(example = "andriy@mail.com", description = "Authenticated user email")
    public String getEmail() {
        return email;
    }

    @Schema(example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI" +
            "6MTY5MjAyMTE4NywiZXhwIjoxNjkyMDI0Nzg3fQ.cDhtb3UzxzYR3gPeIgCOTSaum-Z-yYHyF4VvhF0ND6M",
            description = "Authenticated user token")
    public String getToken() {
        return token;
    }
}
