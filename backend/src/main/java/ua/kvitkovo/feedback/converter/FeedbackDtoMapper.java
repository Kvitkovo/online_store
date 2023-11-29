package ua.kvitkovo.feedback.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import ua.kvitkovo.feedback.dto.FeedbackMessageEmailRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessageResponseDto;
import ua.kvitkovo.feedback.entity.FeedbackMessage;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Mapper(componentModel = "spring")
public interface FeedbackDtoMapper {

    FeedbackMessage mapDtoRequestToEntity(FeedbackMessageEmailRequestDto dto);

    FeedbackMessage mapDtoToEntity(FeedbackMessageResponseDto dto);

    @Mappings({
            @Mapping(target = "authorId", source = "author.id")
    })
    FeedbackMessageResponseDto mapEntityToDto(FeedbackMessage feedbackMessage);

    List<FeedbackMessageResponseDto> mapEntityToDto(List<FeedbackMessage> feedbackMessages);
}
