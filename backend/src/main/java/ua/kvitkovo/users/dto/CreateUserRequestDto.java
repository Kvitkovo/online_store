package ua.kvitkovo.users.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import ua.kvitkovo.users.entity.Role;

import java.util.Date;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "CreateUserRequest")
public class CreateUserRequestDto {

    @Schema(example = "Andrii", description = "User first name")
    private String firstName;

    @Schema(example = "Haponov", description = "User last name")
    private String lastName;

    @NotBlank
    @Pattern(regexp = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$")
    @Schema(example = "andriy@mail.com", description = "User email")
    private String email;

    @Schema(example = "099-123-45-67", description = "User phone")
    private String phone;

    @Schema(example = "ROLE_USER", description = "User role")
    private String role;

    @Schema(example = "2001-09-01", description = "User birthday")
    private Date birthday;

    @Schema(example = "vip client", description = "User comment")
    private String comment;

    @Schema(example = "1", description = "User position ID")
    private Long positionId;
}
