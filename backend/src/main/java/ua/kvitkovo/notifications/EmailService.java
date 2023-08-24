package ua.kvitkovo.notifications;

import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import ua.kvitkovo.users.entity.User;

/**
 * @author Andriy Gaponov
 */
@Slf4j
public class EmailService implements NotificationService{

    @Override
    public void send(NotificationType type, Map<String, String> fields, User user) {
        log.info("send message to {} whith text: {}", user.getEmail(), fields.get("link"));
    }
}
