package ua.kvitkovo.feedback.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackMessageEmailRequestDto {

    @NotBlank
    private String userName;
    @NotBlank
    @Pattern(regexp = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$")
    private String userEmail;
    @NotBlank
    private String messageText;
}
