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
@Schema(name = "ResetPasswordRequest")
public class ResetPasswordRequestDto {

    @NotBlank
    @Schema(example = "41d994af-6611-4b31-9933-f493d0330acd", description = "Verification code from email link")
    private String verificationCode;
    @NotBlank
    @Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})")
    @Schema(example = "NewPassword1", description = "New user password")
    private String newPassword;
}
