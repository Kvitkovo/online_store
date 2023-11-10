package ua.kvitkovo.feedback.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.feedback.dto.FeedbackMessageEmailRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessagePhoneRequestDto;
import ua.kvitkovo.feedback.dto.FeedbackMessageResponseDto;
import ua.kvitkovo.feedback.entity.MessageStatus;
import ua.kvitkovo.feedback.service.FeedbackService;
import ua.kvitkovo.orders.dto.OrderResponseDto;
import ua.kvitkovo.orders.entity.OrderStatus;

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

    @Operation(summary = "Get Feedback message by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = FeedbackMessageResponseDto.class))
            }),
            @ApiResponse(responseCode = "404", description = "Feedback message not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public FeedbackMessageResponseDto getFeedbackMessageById(
            @Parameter(description = "The ID of the Feedback message to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.info("Received request to get the Feedback message with id - {}.", id);
        FeedbackMessageResponseDto dto = feedbackService.findById(id);
        log.info("the Feedback message with id - {} was retrieved - {}.", id, dto);
        return dto;
    }

    @Operation(summary = "Get all Feedback messages")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping
    @ResponseBody
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
        return feedbackService.getAllMessages(pageable, status);
    }

    @Operation(summary = "Set Feedback messages status")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(
                mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = FeedbackMessageResponseDto.class))
            )
        }),
        @ApiResponse(responseCode = "400", description = "Some data is missing", content = {
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
        @ApiResponse(responseCode = "404", description = "Some messages not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{messageIDs}/setStatus")
    public List<FeedbackMessageResponseDto> setFeedbackMessageStatus(
        @PathVariable List<Long> messageIDs,
        @RequestParam MessageStatus status) {
        log.debug("Received request to set Feedback messages with ids {} status {}.", messageIDs,
            status);
        return feedbackService.setFeedbackMessageStatus(messageIDs, status);
    }
}
