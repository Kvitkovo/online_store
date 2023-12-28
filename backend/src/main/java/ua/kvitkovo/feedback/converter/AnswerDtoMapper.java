package ua.kvitkovo.feedback.converter;

import java.util.List;
import org.mapstruct.Mapper;
import ua.kvitkovo.feedback.dto.AnswerMessageResponseDto;
import ua.kvitkovo.feedback.entity.AnswerMessage;

@Mapper(componentModel = "spring")
public interface AnswerDtoMapper {

    AnswerMessageResponseDto mapEntityToDto(AnswerMessage feedbackMessage);

    List<AnswerMessageResponseDto> mapEntityToDto(List<AnswerMessage> feedbackMessages);
}
