package ua.kvitkovo.feedback.converter;

import org.mapstruct.Mapper;
import ua.kvitkovo.feedback.dto.FeedbackMessageFileResponseDto;
import ua.kvitkovo.feedback.entity.FeedbackMessageFile;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface FeedbackFileDtoMapper {

    FeedbackMessageFileResponseDto mapEntityToDto(FeedbackMessageFile feedbackMessage);

    List<FeedbackMessageFileResponseDto> mapEntityToDto(List<FeedbackMessageFile> feedbackMessages);
}
