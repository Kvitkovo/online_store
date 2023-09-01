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
public class ChangePasswordRequestDto {

    @NotBlank
    private String email;
    @NotBlank
    private String oldPassword;
    @NotBlank
    @Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})")
    private String newPassword;

    @Schema(example = "andriy@mail.com", description = "User email")
    public String getEmail() {
        return email;
    }

    @Schema(example = "OldPassword1", description = "Current user password")
    public String getOldPassword() {
        return oldPassword;
    }

    @Schema(example = "NewPassword1", description = "New user password")
    public String getNewPassword() {
        return newPassword;
    }
}
