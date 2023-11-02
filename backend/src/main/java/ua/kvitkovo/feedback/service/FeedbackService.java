package ua.kvitkovo.feedback.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.feedback.converter.FeedbackDtoMapper;
import ua.kvitkovo.feedback.dto.FeedbackMessageEmailRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessagePhoneRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessageResponseDto;
import ua.kvitkovo.feedback.entity.FeedbackMessage;
import ua.kvitkovo.feedback.entity.MessageStatus;
import ua.kvitkovo.feedback.entity.MessageType;
import ua.kvitkovo.feedback.repository.FeedbackRepository;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserService;
import ua.kvitkovo.utils.ErrorUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserService userService;
    private final FeedbackDtoMapper feedbackDtoMapper;
    private final UserDtoMapper userDtoMapper;

    @Transactional
    public FeedbackMessageResponseDto addEmailFeedback(FeedbackMessageEmailRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        FeedbackMessage feedbackMessage = FeedbackMessage.builder()
                .userEmail(dto.getUserEmail())
                .userName(dto.getUserName())
                .messageText(dto.getMessageText())
                .type(MessageType.EMAIL)
                .status(MessageStatus.NEW)
                .build();
        fillAuthorToMessage(feedbackMessage);

        feedbackRepository.save(feedbackMessage);

        log.info("The feedback message was created");
        return feedbackDtoMapper.mapEntityToDto(feedbackMessage);
    }

    @Transactional
    public FeedbackMessageResponseDto addPhoneFeedback(FeedbackMessagePhoneRequestDto dto, BindingResult bindingResult) {
        ErrorUtils.checkItemNotCreatedException(bindingResult);

        FeedbackMessage feedbackMessage = FeedbackMessage.builder()
                .userPhone(dto.getUserPhone())
                .userName(dto.getUserName())
                .messageText(dto.getMessageText())
                .type(MessageType.PHONE)
                .status(MessageStatus.NEW)
                .build();
        fillAuthorToMessage(feedbackMessage);

        feedbackRepository.save(feedbackMessage);

        log.info("The feedback message was created");
        return feedbackDtoMapper.mapEntityToDto(feedbackMessage);
    }

    private void fillAuthorToMessage(FeedbackMessage feedbackMessage) {
        try {
            UserResponseDto currentUser = userService.getCurrentUser();
            User author = userDtoMapper.mapDtoToEntity(currentUser);
            feedbackMessage.setAuthor(author);
        } catch (Exception e) {
            log.info("A feedback message was created by an unauthorized user");
        }
    }

}
