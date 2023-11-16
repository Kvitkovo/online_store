package ua.kvitkovo.feedback.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.feedback.dto.AnswerMessageFileResponseDto;
import ua.kvitkovo.feedback.entity.AnswerFeedbackMessageFile;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface FeedbackFileDtoMapper {

    AnswerMessageFileResponseDto mapEntityToDto(AnswerFeedbackMessageFile feedbackMessage);

    List<AnswerMessageFileResponseDto> mapEntityToDto(List<AnswerFeedbackMessageFile> feedbackMessages);
}
