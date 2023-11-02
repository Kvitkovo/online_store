package ua.kvitkovo.feedback.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackMessageEmailRequestDto {

    @NotBlank
    private String userName;
    @NotBlank
    private String userEmail;
    @NotBlank
    private String messageText;

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getMessageText() {
        return messageText;
    }
}
