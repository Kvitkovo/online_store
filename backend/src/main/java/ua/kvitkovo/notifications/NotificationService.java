package ua.kvitkovo.notifications;

import java.util.List;
import java.util.Map;

public interface NotificationService {

    void send(NotificationType type, Map<String, Object> fields, NotificationUser user);

    List<UserMessage> get();
}
