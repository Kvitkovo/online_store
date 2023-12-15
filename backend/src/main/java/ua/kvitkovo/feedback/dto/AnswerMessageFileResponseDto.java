package ua.kvitkovo.feedback.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "AnswerMessageFile")
public class AnswerMessageFileResponseDto {

    private Long id;
    private String name;
    private String fileUrl;
}
