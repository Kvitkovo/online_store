package ua.kvitkovo.notifications;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService implements NotificationService {

    private final JavaMailSender emailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String emailFrom;

    @Override
    public void send(NotificationType type, Map<String, Object> fields, NotificationUser user) {
        log.info("send message to {} with text: {}", user.getEmail(), fields.get("link"));
        switch (type) {
            case MAIL_CONFIRMATION -> sendEmailMessage("Підтвердження пошти", "email/confirm-email.html", fields, user);
            case MAIL_CONFIRMATION_SUCCESSFULLY ->
                    sendEmailMessage("Ви успішно підтвердили пошту", "email/confirm-email-successfully.html", fields, user);
            case RESET_PASSWORD -> sendEmailMessage("Запит на зміну паролю", "email/reset-password.html", fields, user);
            case CHANGE_PASSWORD ->
                    sendEmailMessage("Ви успішно змінили пароль", "email/reset-password-successfully.html", fields, user);
            case CREATE_NEW_USER ->
                    sendEmailMessage("Вас було зареєстровано на сайті", "email/confirm-email-after_admin-add-user.html", fields, user);
            case ANSWER_FEEDBACK_MESSAGE ->
                    sendEmailMessage("Служба підтримки Kvitkovo", "email/answer-message.html", fields, user);
        }
    }

    private void sendEmailMessage(String subject, String template, Map<String, Object> fields, NotificationUser user) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = null;
        try {
            mimeMessageHelper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            Context context = new Context();
            context.setVariables(fields);
            String emailContent = templateEngine.process(template, context);

            mimeMessageHelper.setTo(user.getEmail());
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setFrom(emailFrom);
            mimeMessageHelper.setText(emailContent, true);
            emailSender.send(message);
        } catch (Exception e) {
            log.info("Email not send");
            log.info(e.getMessage());
        }
    }
}
