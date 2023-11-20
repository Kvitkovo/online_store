package ua.kvitkovo.feedback.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "feedback_files")
public class AnswerFeedbackMessageFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "answer_message_id", nullable = false)
    private AnswerMessage message;

    @Column(name = "file_name", nullable = false)
    private String name;

    @Column(name = "file_url")
    private String fileUrl;
}
