package ua.kvitkovo.feedback.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "FeedbackMessageEmailRequest")
public class FeedbackMessageEmailRequestDto {

    @NotBlank
    private String userName;
    @NotBlank
    @Pattern(regexp = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$")
    private String userEmail;
    @NotBlank
    private String messageText;
}
