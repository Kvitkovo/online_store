package ua.kvitkovo.feedback.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import ua.kvitkovo.feedback.entity.MessageStatus;
import ua.kvitkovo.feedback.entity.MessageType;

import java.time.LocalDateTime;
import java.util.Set;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackMessageResponseDto {

    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
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
    private Set<FeedbackMessageFileResponseDto> files;
}
