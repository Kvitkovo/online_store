package ua.kvitkovo.feedback.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.kvitkovo.feedback.converter.FeedbackDtoMapper;
import ua.kvitkovo.feedback.dto.FeedbackMessageEmailRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessagePhoneRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessageResponseDto;
import ua.kvitkovo.feedback.entity.FeedbackMessage;
import ua.kvitkovo.feedback.entity.MessageStatus;
import ua.kvitkovo.feedback.service.FeedbackService;
import ua.kvitkovo.annotations.ApiResponseBadRequest;
import ua.kvitkovo.annotations.ApiResponseForbidden;
import ua.kvitkovo.annotations.ApiResponseNotFound;
import ua.kvitkovo.annotations.ApiResponseSuccessful;
import ua.kvitkovo.annotations.ApiResponseUnauthorized;

@Tag(name = "Feedback", description = "the feedback messages API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/feedback")
public class FeedbackMessageController {

    private final FeedbackService feedbackService;
    private final FeedbackDtoMapper feedbackDtoMapper;

    @Operation(summary = "Add a new Feedback message with email")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = FeedbackMessageResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PostMapping("/email")
    public FeedbackMessageResponseDto addEmailFeedback(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final FeedbackMessageEmailRequestDto request,
        BindingResult bindingResult) {
        log.info("Received request to create Feedback message - {}.", request);
        FeedbackMessage feedbackMessage = feedbackService.addEmailFeedback(request, bindingResult);
        return feedbackDtoMapper.mapEntityToDto(feedbackMessage);
    }

    @Operation(summary = "Add a new Feedback message with phone")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = FeedbackMessageResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PostMapping("/phone")
    public FeedbackMessageResponseDto addPhoneFeedback(
        @RequestBody @Valid @NotNull(message = "Request body is mandatory") final FeedbackMessagePhoneRequestDto request,
        BindingResult bindingResult) {
        log.info("Received request to create Feedback message - {}.", request);
        FeedbackMessage feedbackMessage = feedbackService.addPhoneFeedback(request, bindingResult);
        return feedbackDtoMapper.mapEntityToDto(feedbackMessage);
    }

    @Operation(summary = "Add a new answer Feedback message")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = FeedbackMessageResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PostMapping(path = "/answer", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public FeedbackMessageResponseDto addFeedbackMessageWithFile(
        @RequestParam(value = "mainMessageId", required = true) Long mainMessageId,
        @RequestParam(value = "message", required = true) String message,
        @RequestParam(value = "file", required = false) MultipartFile file) {
        log.info("Received request to create answer Feedback message to message {} with id {}.",
            message);
        FeedbackMessage feedbackMessage = feedbackService.addFeedbackMessageWithFileFromAdminPanel(
            mainMessageId, message, file);
        return feedbackDtoMapper.mapEntityToDto(feedbackMessage);
    }

    @Operation(summary = "Get Feedback message by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = FeedbackMessageResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/{id}")
    public FeedbackMessageResponseDto getFeedbackMessageById(
        @Parameter(description = "The ID of the Feedback message to retrieve", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id) {
        log.info("Received request to get the Feedback message with id - {}.", id);
        FeedbackMessage feedbackMessage = feedbackService.findById(id);
        log.info("the Feedback message with id - {} was retrieved - {}.", id, feedbackMessage);
        return feedbackDtoMapper.mapEntityToDto(feedbackMessage);
    }

    @Operation(summary = "Get all Feedback messages")
    @ApiResponseSuccessful
    @GetMapping
    public Page<FeedbackMessageResponseDto> getAllMessages(

        @Parameter(description = "Number of page (1..N)", required = true,
            schema = @Schema(type = "integer", defaultValue = "1")
        ) @RequestParam(defaultValue = "1") int page,
        @Parameter(description = "The size of the page to be returned", required = true,
            schema = @Schema(type = "integer", defaultValue = "12")
        ) @RequestParam(defaultValue = "12") int size,
        @Parameter(description = "Sort direction (ASC, DESC)",
            schema = @Schema(type = "string")
        ) @RequestParam(required = false, defaultValue = "ASC") String sortDirection,
        @Parameter(description = "Message status"
        ) @RequestParam(required = true) MessageStatus status
    ) {
        log.debug("Received request to get all Feedback messages.");
        Pageable pageable = PageRequest.of(page - 1, size, Sort.Direction.valueOf(sortDirection),
            "created");
        Page<FeedbackMessage> messages = feedbackService.getAllMessages(pageable, status);
        return messages.map(feedbackDtoMapper::mapEntityToDto);
    }

    @Operation(summary = "Set Feedback messages status")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(
            mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = FeedbackMessageResponseDto.class))
        )
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{messageIDs}/setStatus")
    public List<FeedbackMessageResponseDto> setFeedbackMessageStatus(
        @PathVariable List<Long> messageIDs,
        @RequestParam MessageStatus status) {
        log.debug("Received request to set Feedback messages with ids {} status {}.", messageIDs,
            status);
        List<FeedbackMessage> feedbackMessages = feedbackService.setFeedbackMessageStatus(
            messageIDs, status);
        return feedbackDtoMapper.mapEntityToDto(feedbackMessages);
    }
}
