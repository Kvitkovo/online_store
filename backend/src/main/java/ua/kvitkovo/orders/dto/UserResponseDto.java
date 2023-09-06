package ua.kvitkovo.orders.dto;

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
public class UserResponseDto {

    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    @Schema(example = "1", description = "User ID")
    public long getId() {
        return id;
    }

    @Schema(example = "Шевченко", description = "User first name")
    public String getFirstName() {
        return firstName;
    }

    @Schema(example = "Олена", description = "User last name")
    public String getLastName() {
        return lastName;
    }

    @Schema(example = "test@mail.com", description = "User email")
    public String getEmail() {
        return email;
    }

    @Schema(example = "099-123-45-67", description = "User phone")
    public String getPhone() {
        return phone;
    }
}
