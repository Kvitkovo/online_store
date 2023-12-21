package ua.kvitkovo.users.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import ua.kvitkovo.users.entity.Position;
import ua.kvitkovo.users.entity.Role;
import ua.kvitkovo.users.entity.UserStatus;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "User")
public class UserResponseDto {

    @Schema(example = "1", description = "User ID")
    private long id;

    @Schema(example = "Шевченко", description = "User first name")
    private String firstName;

    @Schema(example = "Олена", description = "User last name")
    private String lastName;

    @Schema(example = "Valeriivna", description = "User surname")
    private String surname;

    @Schema(example = "test@mail.com", description = "User email")
    private String email;

    @Schema(example = "099-123-45-67", description = "User phone")
    private String phone;

    @Schema(example = "ACTIVE")
    private UserStatus status;

    @Schema(example = "true", description = "Email is confirmed")
    private boolean emailConfirmed;

    @Schema(example = "true", description = "Permission to receive advertising messages")
    private boolean newsletter;

    @Schema(example = "2001-09-01", description = "User birthday")
    private Date birthday;

    @Schema(example = "", description = "User comment")
    private String comment;

    @Schema(example = "manager")
    private Position position;

    private List<Role> roles;

    @Override
    public String toString() {
        return "UserResponseDto{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
