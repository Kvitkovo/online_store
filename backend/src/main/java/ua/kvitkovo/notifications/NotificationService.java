package ua.kvitkovo.notifications;

import java.util.Map;
import ua.kvitkovo.users.entity.User;

/**
 * @author Andriy Gaponov
 */
public interface NotificationService {

    void send(NotificationType type, Map<String, String> fields, User user);
}
