package ua.kvitkovo.feedback.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackMessagePhoneRequestDto {

    @NotBlank
    private String userName;
    @NotBlank
    @Pattern(regexp = "^\\+380\\d{3}\\d{2}\\d{2}\\d{2}$")
    private String userPhone;
    @NotBlank
    private String messageText;
}
