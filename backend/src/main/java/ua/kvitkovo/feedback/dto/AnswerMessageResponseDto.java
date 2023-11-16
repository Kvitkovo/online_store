package ua.kvitkovo.feedback.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerMessageResponseDto {

    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created;
    private Long authorId;
    private String authorName;
    private Long managerId;
    private String managerName;
    private String messageText;
    private Set<AnswerMessageFileResponseDto> files;
}
