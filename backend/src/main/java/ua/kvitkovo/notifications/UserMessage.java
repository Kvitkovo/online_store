package ua.kvitkovo.notifications;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserMessage {

    private String address;
    private String message;
    private Long mainMessageId;
}
