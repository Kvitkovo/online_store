package ua.kvitkovo.feedback.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.feedback.dto.FeedbackMessageEmailRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessagePhoneRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessageResponseDto;
import ua.kvitkovo.feedback.service.FeedbackService;

@Tag(name = "Feedback", description = "the feedback messages API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/feedback")
public class FeedbackMessageController {

    private final FeedbackService feedbackService;

    @Operation(summary = "Add a new Feedback message with email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = FeedbackMessageResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Feedback message has already been added " +
                    "or some data is missing", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "404", description = "Some dependencies were not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @PostMapping("/email")
    @ResponseBody
    public FeedbackMessageResponseDto addEmailFeedback(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final FeedbackMessageEmailRequestDto request,
            BindingResult bindingResult) {
        log.info("Received request to create Feedback message - {}.", request);
        return feedbackService.addEmailFeedback(request, bindingResult);
    }

    @Operation(summary = "Add a new Feedback message with phone")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = FeedbackMessageResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Feedback message has already been added " +
                    "or some data is missing", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "404", description = "Some dependencies were not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @PostMapping("/phone")
    @ResponseBody
    public FeedbackMessageResponseDto addPhoneFeedback(
            @RequestBody @Valid @NotNull(message = "Request body is mandatory") final FeedbackMessagePhoneRequestDto request,
            BindingResult bindingResult) {
        log.info("Received request to create Feedback message - {}.", request);
        return feedbackService.addPhoneFeedback(request, bindingResult);
    }
}
