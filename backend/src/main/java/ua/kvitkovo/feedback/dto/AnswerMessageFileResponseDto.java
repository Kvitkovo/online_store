package ua.kvitkovo.feedback.dto;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerMessageFileResponseDto {

    private Long id;
    private String name;
    private String fileUrl;
}
