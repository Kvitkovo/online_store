package ua.kvitkovo.notifications;

import jakarta.mail.BodyPart;
import jakarta.mail.Flags;
import jakarta.mail.Folder;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.Store;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import jakarta.mail.search.FlagTerm;
import jakarta.mail.search.SearchTerm;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

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

    @Value("${spring.mail.properties.mail.imap.port}")
    private String imapPort;

    @Override
    public void send(NotificationType type, Map<String, Object> fields, NotificationUser user) {
        log.info("send message to {} with text: {}", user.getEmail(), fields.get("link"));
        switch (type) {
            case MAIL_CONFIRMATION -> sendEmailMessage("Підтвердження пошти",
                "email/confirm-email.html",
                fields,
                user
            );
            case MAIL_CONFIRMATION_SUCCESSFULLY -> sendEmailMessage("Ви успішно підтвердили пошту",
                "email/confirm-email-successfully.html",
                fields,
                user
            );
            case RESET_PASSWORD -> sendEmailMessage("Запит на зміну паролю",
                "email/reset-password.html",
                fields,
                user
            );
            case CHANGE_PASSWORD -> sendEmailMessage("Ви успішно змінили пароль",
                "email/reset-password-successfully.html",
                fields,
                user
            );
            case CREATE_NEW_USER -> sendEmailMessage("Вас було зареєстровано на сайті",
                "email/confirm-email-after_admin-add-user.html",
                fields,
                user)
            ;
            case ANSWER_FEEDBACK_MESSAGE -> sendEmailMessage("Служба підтримки Kvitkovo",
                "email/answer-message.html",
                fields,
                user
            );
            case NEW_ORDER -> sendEmailMessage("Нове замовлення на сайті Kvitkovo",
                "email/new_order.html",
                fields,
                user
            );
            case REGISTER_BY_GOOGLE -> sendEmailMessage("Вас було зареєстровано на сайті",
                    "email/register_by_google.html",
                    fields,
                    user
            );
        }
    }

    @Override
    public List<UserMessage> get() {
        List<UserMessage> messageList = new ArrayList<>();
        try {
            Properties properties = new Properties();
            properties.setProperty("mail.store.protocol", "imaps");

            properties.setProperty("mail.imaps.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
            properties.setProperty("mail.imaps.socketFactory.fallback", "false");
            properties.setProperty("mail.imaps.ssl.enable", "false");
            properties.setProperty("mail.imaps.socketFactory.port", imapPort);
            properties.setProperty("mail.imaps.starttls.enable", "true");
            properties.setProperty("mail.imaps.ssl.trust", imapHost);

            Session session = Session.getDefaultInstance(properties, null);
            Store store = session.getStore("imaps");
            store.connect(imapHost, emailFrom, emailPassword);

            Folder inbox = store.getFolder("INBOX");
            inbox.open(Folder.READ_WRITE);

            SearchTerm searchTerm = new FlagTerm(new Flags(Flags.Flag.SEEN), false);
            Message[] unreadMessages = inbox.search(searchTerm);

            for (Message message : unreadMessages) {

                String address = ((InternetAddress) message.getFrom()[0]).getAddress();
                String messageContentText = "";
                if (message.getContent() instanceof MimeMultipart) {
                    MimeMultipart multipart = (MimeMultipart) message.getContent();
                    if (multipart.getCount() > 0) {
                        BodyPart bodyPart = multipart.getBodyPart(0);
                        String contentType = bodyPart.getContentType();
                        Object content = bodyPart.getContent();

                        if (contentType.contains("TEXT")) {
                            messageContentText = content.toString();
                            String messageText = getMessageText(messageContentText);
                            Long messageId = getMessageId(messageContentText);

                            messageList.add(UserMessage.builder()
                                .address(address)
                                .mainMessageId(messageId)
                                .message(messageText)
                                .build()
                            );
                        }
                    }
                }

                if (message.getContent() instanceof String) {
                    messageContentText = (String) message.getContent();
                    String messageText = getMessageText(messageContentText);
                    Long messageId = getMessageId(messageContentText);

                    messageList.add(UserMessage.builder()
                        .address(address)
                        .mainMessageId(messageId)
                        .message(messageText)
                        .build()
                    );
                }

                message.setFlag(Flags.Flag.DELETED, true);
            }

            inbox.close(true);
            store.close();
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }

        return messageList;
    }

    private void sendEmailMessage(String subject, String template, Map<String, Object> fields,
        NotificationUser user) {
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

    private String getMessageText(String message) {
        String result = "";
        Pattern pattern = Pattern.compile("^\\s*$", Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(message);

        if (matcher.find()) {
            result = message.substring(0, matcher.start());
        }
        return result;
    }

    private Long getMessageId(String message) {
        Long result = null;
        Pattern pattern = Pattern.compile("Запит #(\\d+)", Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(message);

        if (matcher.find()) {
            String numberString = matcher.group(1);
            result = Long.parseLong(numberString);
        }
        return result;
    }
}
