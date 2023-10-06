package ua.kvitkovo.users.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.users.entity.Position;
import ua.kvitkovo.users.entity.Role;
import ua.kvitkovo.users.entity.UserStatus;

import java.util.Date;
import java.util.List;

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
    private String surname;
    private String email;
    private String phone;
    private UserStatus status;
    private boolean emailConfirmed;
    private boolean newsletter;
    private Date birthday;
    private String comment;
    private Position position;
    private List<Role> roles;

    @Schema(example = "2001-09-01", description = "User birthday")
    public Date getBirthday() {
        return birthday;
    }

    @Schema(example = "", description = "User comment")
    public String getComment() {
        return comment;
    }

    @Schema(example = "vip client", description = "User comment")
    public Position getPosition() {
        return position;
    }

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

    @Schema(example = "Valeriyovich", description = "User surname")
    public String getSurname() {
        return surname;
    }

    @Schema(example = "test@mail.com", description = "User email")
    public String getEmail() {
        return email;
    }

    @Schema(example = "099-123-45-67", description = "User phone")
    public String getPhone() {
        return phone;
    }

    public UserStatus getStatus() {
        return status;
    }

    @Schema(example = "true", description = "Email is confirmed")
    public boolean isEmailConfirmed() {
        return emailConfirmed;
    }

    @Schema(example = "true", description = "Permission to receive advertising messages")
    public boolean isNewsletter() {
        return newsletter;
    }

    public List<Role> getRoles() {
        return roles;
    }
}
