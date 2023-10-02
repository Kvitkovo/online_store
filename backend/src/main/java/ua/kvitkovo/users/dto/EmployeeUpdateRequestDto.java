package ua.kvitkovo.users.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
public class EmployeeUpdateRequestDto {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;
    private Date birthday;
    private String comment;
    private Long positionId;


    @Schema(example = "employee", description = "User comment")
    public String getComment() {
        return comment;
    }

    @Schema(example = "1", description = "User position ID")
    public Long getPositionId() {
        return positionId;
    }

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
}
