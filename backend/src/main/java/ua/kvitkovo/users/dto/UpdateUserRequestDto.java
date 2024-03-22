package ua.kvitkovo.users.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequestDto {

    @NotBlank
    @Size(min = 1, max = 255, message
            = "firstName must be between 1 and 255 characters")
    @Schema(example = "Andrii", description = "User first name")
    private String firstName;

    @Size(min = 1, max = 255, message
            = "The lastName must contain no more than 255 characters")
    @Schema(example = "Haponov", description = "User last name")
    private String lastName;

    @Size(min = 1, max = 255, message
            = "The surname must contain no more than 255 characters")
    @Schema(example = "Valeriyovich", description = "User surname")
    private String surname;

    @NotBlank
    @Pattern(regexp = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$")
    @Schema(example = "andriy@mail.com", description = "User email")
    private String email;

    @Size(min = 1, max = 255, message
            = "The phone must contain no more than 255 character")
    @Schema(example = "099-123-45-67", description = "User phone")
    private String phone;

    @Schema(example = "2001-09-01", description = "User birthday")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date birthday;
}
