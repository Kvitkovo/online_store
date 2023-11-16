package ua.kvitkovo.feedback.dto;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackMessageFileResponseDto {

    private Long id;
    private String name;
    private String fileUrl;
}
