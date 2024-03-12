package ua.kvitkovo.users.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "EmployeeUpdateRequest")
public class EmployeeUpdateRequestDto {

    @Schema(example = "Andrii", description = "User first name")
    private String firstName;

    @Schema(example = "Haponov", description = "User last name")
    private String lastName;

    @Schema(example = "andriy@mail.com", description = "User email")
    private String email;

    @Schema(example = "099-123-45-67", description = "User phone")
    private String phone;

    @Schema(example = "Password", description = "User password")
    private String password;

    @Schema(example = "2001-09-01", description = "User birthday")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date birthday;

    @Schema(example = "employee", description = "User comment")
    private String comment;

    @Schema(example = "1", description = "User position ID")
    private Long positionId;
}
