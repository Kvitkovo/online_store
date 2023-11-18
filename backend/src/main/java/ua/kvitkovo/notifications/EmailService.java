package ua.kvitkovo.notifications;

import jakarta.mail.*;
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

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Properties;

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

    @Value("${spring.mail.password}")
    private String emailPassword;

    @Value("${spring.mail.properties.mail.imap.host}")
    private String imapHost;

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

    @Override
    public void get() {
        receiveEmails();
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

    public void receiveEmails() {
        try {
            Properties properties = new Properties();
            properties.setProperty("mail.store.protocol", "imaps");

            Session session = Session.getDefaultInstance(properties, null);
            Store store = session.getStore("imaps");
            store.connect(imapHost, emailFrom, emailPassword);

            Folder inbox = store.getFolder("INBOX");
            inbox.open(Folder.READ_ONLY);

            Message[] messages = inbox.getMessages();
            for (Message message : messages) {
                System.out.println("Subject: " + message.getSubject());
                System.out.println("From: " + message.getFrom()[0]);
                System.out.println("Date: " + message.getSentDate());
                System.out.println("Content: " + message.getContent());
                System.out.println("------------------------------------------------------------");
            }

            inbox.close(false);
            store.close();

        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }
    }
}
