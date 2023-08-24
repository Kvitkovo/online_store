package ua.kvitkovo.notifications;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import ua.kvitkovo.users.entity.User;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService implements NotificationService{

    private final JavaMailSender emailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String emailFrom;

    @Override
    public void send(NotificationType type, Map<String, Object> fields, User user) {
        log.info("send message to {} with text: {}", user.getEmail(), fields.get("link"));
        switch (type){
            case MAIL_CONFIRMATION -> sendEmailMessage("Підтвердження пошти", "email/confirm-email.html", fields, user);
            case MAIL_CONFIRMATION_SUCCESSFULLY -> sendEmailMessage("Ви успішно підтвердили пошту", "email/confirm-email-successfully.html", fields, user);
        }
    }

    private void sendEmailMessage(String subject, String template, Map<String, Object> fields, User user){
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
        } catch (MessagingException e) {
            //NOP
        }
    }
}
