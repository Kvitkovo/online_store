package ua.kvitkovo.feedback.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.feedback.converter.FeedbackDtoMapper;
import ua.kvitkovo.feedback.dto.FeedbackMessageEmailRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessagePhoneRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessageResponseDto;
import ua.kvitkovo.feedback.entity.FeedbackMessage;
import ua.kvitkovo.feedback.entity.FeedbackMessageFile;
import ua.kvitkovo.feedback.entity.MessageStatus;
import ua.kvitkovo.feedback.entity.MessageType;
import ua.kvitkovo.feedback.repository.FeedbackRepository;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserService;
import ua.kvitkovo.utils.ErrorUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserService userService;
    private final FeedBackMessageFileService feedBackMessageFileService;
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

    public FeedbackMessageResponseDto findById(Long id) {
        return feedbackDtoMapper.mapEntityToDto(getFeedbackMessage(id));
    }

    public Page<FeedbackMessageResponseDto> getAllMessages(Pageable pageable,
                                                           MessageStatus status) {
        Page<FeedbackMessage> messages = feedbackRepository.findByStatus(status, pageable);
        if (messages.isEmpty()) {
            return Page.empty();
        } else {
            return messages.map(feedbackDtoMapper::mapEntityToDto);
        }
    }

    @Transactional
    public List<FeedbackMessageResponseDto> setFeedbackMessageStatus(List<Long> messageIDs,
                                                                     MessageStatus status) {
        List<FeedbackMessage> messages = messageIDs.stream()
                .map(id -> feedbackRepository.findById(id)
                        .orElseThrow(() -> new ItemNotFoundException("Feedback message not found")))
                .toList();

        for (FeedbackMessage message : messages) {
            message.setStatus(status);
            feedbackRepository.save(message);
        }
        return feedbackDtoMapper.mapEntityToDto(messages);
    }

    @Transactional
    public void deleteClosedMessages(LocalDate dateEndMessage) {
        List<FeedbackMessage> oldClosedMessages = feedbackRepository.findByStatusAndCreatedLessThan(
                MessageStatus.CLOSED,
                dateEndMessage
        );

        for (FeedbackMessage message : oldClosedMessages) {
            Set<FeedbackMessageFile> files = message.getFiles();
            for (FeedbackMessageFile file : files) {
                feedBackMessageFileService.deleteFile(file.getFileUrl());
            }
            feedbackRepository.delete(message);
        }
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

    private FeedbackMessage getFeedbackMessage(long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Feedback message not found"));
    }
}
