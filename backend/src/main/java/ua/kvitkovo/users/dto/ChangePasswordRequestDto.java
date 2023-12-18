package ua.kvitkovo.users.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "ChangePasswordRequest")
public class ChangePasswordRequestDto {

    @NotBlank
    @Schema(example = "andriy@mail.com", description = "User email")
    private String email;

    @NotBlank
    @Schema(example = "OldPassword1", description = "Current user password")
    private String oldPassword;

    @NotBlank
    @Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})")
    @Schema(example = "NewPassword1", description = "New user password")
    private String newPassword;
}
