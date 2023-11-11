package ua.kvitkovo.feedback.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ua.kvitkovo.users.entity.User;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "feedback_messages")
@EntityListeners(AuditingEntityListener.class)
public class FeedbackMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @CreatedDate
    @Column(name = "created")
    private Date created;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @Column(name = "message_status")
    @Enumerated(EnumType.STRING)
    private MessageStatus status;

    @Column(name = "message_type")
    @Enumerated(EnumType.STRING)
    private MessageType type;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_phone")
    private String userPhone;

    @Column(name = "message_text")
    private String messageText;

    @ManyToOne
    @JoinColumn(name = "main_message_id")
    private FeedbackMessage mainMessage;
}
