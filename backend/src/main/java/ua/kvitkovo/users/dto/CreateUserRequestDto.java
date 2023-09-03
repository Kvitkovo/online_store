package ua.kvitkovo.users.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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
public class CreateUserRequestDto {

    private String firstName;
    private String lastName;
    @NotBlank
    @Pattern(regexp ="^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$")
    private String email;
    private String phone;
    private String role;

    @Schema(example = "ROLE_USER", description = "User role")
    public String getRole() {
        return role;
    }

    @Schema(example = "Andrii", description = "User first name")
    public String getFirstName() {
        return firstName;
    }

    @Schema(example = "Haponov", description = "User last name")
    public String getLastName() {
        return lastName;
    }

    @Schema(example = "andriy@mail.com", description = "User email")
    public String getEmail() {
        return email;
    }

    @Schema(example = "099-123-45-67", description = "User phone")
    public String getPhone() {
        return phone;
    }
}
