package ua.kvitkovo.notifications;

import java.util.Map;

/**
 * @author Andriy Gaponov
 */
public interface NotificationService {

    void send(NotificationType type, Map<String, Object> fields, NotificationUser user);

    void get();
}
