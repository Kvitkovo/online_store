package ua.kvitkovo.feedback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.feedback.entity.MessageStatus;
import ua.kvitkovo.feedback.entity.MessageType;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackMessageResponseDto {

    private Long managerId;
    private Long authorId;
    private String userName;
    private String userPhone;
    private String userEmail;
    private String messageText;
    private MessageStatus status;
    private MessageType type;
    private Long mainMessageId;


    public Long getManagerId() {
        return managerId;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getMessageText() {
        return messageText;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public MessageType getType() {
        return type;
    }

    public Long getMainMessageId() {
        return mainMessageId;
    }
}
