package ua.kvitkovo.feedback.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ua.kvitkovo.users.entity.User;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "feedback_answers")
@EntityListeners(AuditingEntityListener.class)
public class AnswerMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @CreatedDate
    @Column(name = "created")
    private LocalDateTime created;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @Column(name = "message_text")
    private String messageText;

    @ManyToOne
    @JoinColumn(name = "feedback_message_id", nullable = false)
    private FeedbackMessage message;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "message", fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<AnswerFeedbackMessageFile> files;
}
