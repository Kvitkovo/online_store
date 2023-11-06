package ua.kvitkovo.feedback.dto;

import java.time.LocalDateTime;
import java.util.Date;
import lombok.*;
import ua.kvitkovo.feedback.entity.MessageStatus;
import ua.kvitkovo.feedback.entity.MessageType;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackMessageResponseDto {

    private Long id;
    private LocalDateTime created;
    private Long managerId;
    private Long authorId;
    private String userName;
    private String userPhone;
    private String userEmail;
    private String messageText;
    private MessageStatus status;
    private MessageType type;
    private Long mainMessageId;
}
