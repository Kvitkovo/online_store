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
public class FeedbackMessagePhoneRequestDto {

    @NotBlank
    private String userName;
    @NotBlank
    private String userPhone;
    @NotBlank
    private String messageText;

    public String getUserName() {
        return userName;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public String getMessageText() {
        return messageText;
    }
}
