package ua.kvitkovo.users.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {

    @NotBlank
    @Size(min = 1, max = 255, message
        = "firstName must be between 1 and 255 characters")
    private String firstName;
    @Size(min = 1, max = 255, message
        = "The lastName must contain no more than 255 characters")
    private String lastName;
    @Size(min = 1, max = 255, message
        = "The surname must contain no more than 255 characters")
    private String surname;
    @NotBlank
    @Pattern(regexp = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$")
    private String email;
    @Size(min = 1, max = 255, message
        = "The phone must contain no more than 255 character")
    private String phone;
    @NotBlank
    @Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})")
    private String password;
    private Date birthday;

    @Schema(example = "2001-09-01", description = "User birthday")
    public Date getBirthday() {
        return birthday;
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

    @Schema(example = "Password", description = "User password")
    public String getPassword() {
        return password;
    }

    @Schema(example = "Valeriyovich", description = "User surname")
    public String getSurname() {
        return surname;
    }
}
