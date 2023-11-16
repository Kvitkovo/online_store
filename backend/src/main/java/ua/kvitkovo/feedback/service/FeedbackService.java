package ua.kvitkovo.feedback.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.feedback.converter.FeedbackDtoMapper;
import ua.kvitkovo.feedback.dto.AnswerMessageResponseDto;
import ua.kvitkovo.feedback.dto.FeedbackMessageEmailRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessagePhoneRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessageResponseDto;
import ua.kvitkovo.feedback.entity.AnswerFeedbackMessageFile;
import ua.kvitkovo.feedback.entity.FeedbackMessage;
import ua.kvitkovo.feedback.entity.MessageStatus;
import ua.kvitkovo.feedback.entity.MessageType;
import ua.kvitkovo.feedback.repository.FeedbackRepository;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserService;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;

import java.time.LocalDate;
import java.util.HashSet;
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

    @Transactional
    public FeedbackMessageResponseDto addFeedbackMessageWithFile(Long mainImageId, String message,
        MultipartFile file) {

        FeedbackMessage feedbackMessage = feedbackRepository.findById(mainImageId)
            .orElseThrow(
                () -> new ItemNotFoundException("Feedback message not found"));

        FeedbackMessage answerMessage = FeedbackMessage.builder()
                .messageText(message)
                .type(MessageType.ANSWER)
                .status(MessageStatus.NEW)
                .mainMessage(feedbackMessage)
                .userName(userService.getCurrentUser().getFirstName())
                .build();
        fillAuthorToMessage(answerMessage);

        String newFileName;
        if (file != null) {
            newFileName = Helper.getRandomString(8) + "_" + feedbackMessage.getId() + "_" + file.getOriginalFilename();
            String fileUrl = feedBackMessageFileService.sendFile(file, newFileName);
            if (!fileUrl.isEmpty()) {
                AnswerFeedbackMessageFile messageFile = AnswerFeedbackMessageFile.builder()
                        .message(answerMessage)
                        .fileUrl(fileUrl)
                        .name(newFileName)
                        .build();

                Set<AnswerFeedbackMessageFile> files = new HashSet<>();
                files.add(messageFile);
                answerMessage.setFiles(files);
            }
        }

        feedbackRepository.save(answerMessage);
        return feedbackDtoMapper.mapEntityToDto(answerMessage);
    }

    public FeedbackMessageResponseDto findById(Long id) {
        return feedbackDtoMapper.mapEntityToDto(getFeedbackMessage(id));
    }

    public Page<FeedbackMessageResponseDto> getAllMessages(Pageable pageable,
        MessageStatus status) {
        Page<FeedbackMessage> messages = feedbackRepository.findByStatusAndTypeNot(status, MessageType.ANSWER, pageable);
        if (messages.isEmpty()) {
            return Page.empty();
        } else {
            Page<FeedbackMessageResponseDto> messagesDtos = messages.map(feedbackDtoMapper::mapEntityToDto);
            for (FeedbackMessageResponseDto messagesDto : messagesDtos) {
                messagesDto.setAnswers(getAnswers(messagesDto.getMainMessageId()));
            }
            return messagesDtos;
        }
    }

    private List<AnswerMessageResponseDto> getAnswers(Long mainMessageId) {
        return feedbackRepository.findAnswersByMainMessageId(MessageStatus.NEW, MessageType.ANSWER, mainMessageId);
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
            Set<AnswerFeedbackMessageFile> files = message.getFiles();
            for (AnswerFeedbackMessageFile file : files) {
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
