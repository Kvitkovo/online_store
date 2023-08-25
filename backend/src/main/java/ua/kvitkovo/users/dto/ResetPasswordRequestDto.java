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
public class ResetPasswordRequestDto {

    @NotBlank
    private String verificationCode;
    @NotBlank
    @Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})")
    private String newPassword;

    @Schema(example = "41d994af-6611-4b31-9933-f493d0330acd", description = "Verification code from email link")
    public String getVerificationCode() {
        return verificationCode;
    }

    @Schema(example = "NewPassword1", description = "New user password")
    public String getNewPassword() {
        return newPassword;
    }
}
