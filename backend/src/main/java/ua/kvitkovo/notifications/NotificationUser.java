package ua.kvitkovo.notifications;

import lombok.*;
import ua.kvitkovo.feedback.entity.FeedbackMessage;
import ua.kvitkovo.users.entity.User;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationUser {

    private String email;
    private String name;
    private String phone;

    public static NotificationUser build(User details) {
        return NotificationUser.builder()
                .email(details.getEmail())
                .name(details.getFirstName() + " " + details.getLastName())
                .phone(details.getPhone())
                .build();
    }

    public static NotificationUser build(FeedbackMessage feedbackMessage) {
        return NotificationUser.builder()
                .email(feedbackMessage.getUserEmail())
                .phone(feedbackMessage.getUserPhone())
                .name(feedbackMessage.getUserName())
                .build();
    }

    public static NotificationUser build(String email, String phone, String name) {
        return NotificationUser.builder()
                .email(email)
                .name(name)
                .phone(phone)
                .build();
    }
}
