package ua.kvitkovo.users.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.users.dto.ChangePasswordRequestDto;
import ua.kvitkovo.users.dto.ResetPasswordRequestDto;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.service.UserService;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Users", description = "the users API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/users")
public class UserController {

    private final UserService userService;

    @Operation(summary = "Get all Client by Page")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "404", description = "If clients don't exist in the Data Base"),
    })
    @GetMapping(path = "/clients")
    public Page<UserResponseDto> getClients(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "30") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return userService.getClientsByPage(pageable);
    }

    @Operation(summary = "Confirm user email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "404", description = "Verification code not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @GetMapping("/email/{code}/confirm")
    @ResponseBody
    public ResponseEntity<Void> confirmEmail(
        @Parameter(description = "Verification code", required = true,
            schema = @Schema(type = "string")
        )
        @PathVariable String code) {
        log.info("Received request to confirm user mail with Verification code - {}.", code);
        userService.confirmEmail(code);
        log.info("Email confirmed");
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Send request to reset user password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "404", description = "User email not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PostMapping("/resetPassword/{email}")
    @ResponseBody
    public ResponseEntity<Void> sendResetPassword(
        @Parameter(description = "Email of the user whose password needs to be reset", required = true,
            schema = @Schema(type = "string")
        )
        @PathVariable String email) {
        log.info("Received request to reset password with email - {}.", email);
        userService.sendResetPassword(email);
        log.info("Email send to {} for reset password", email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Reset user password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "400", description = "Some data is missing or wrong",
            content = {
                @Content(mediaType = "application/json", schema =
                @Schema(implementation = ErrorResponse.class))
            }),
        @ApiResponse(responseCode = "404", description = "Verification code not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PostMapping("/resetPassword")
    @ResponseBody
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordRequestDto requestDto,
        BindingResult bindingResult) {
        log.info("Received request to reset user password with Verification code.");
        userService.resetPassword(requestDto, bindingResult);
        log.info("Password reset");
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Change user password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "400", description = "Some data is missing or wrong",
            content = {
                @Content(mediaType = "application/json", schema =
                @Schema(implementation = ErrorResponse.class))
            })
    })
    @PostMapping("/changePassword")
    @ResponseBody
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequestDto changePasswordRequestDto,
        BindingResult bindingResult) {
        log.info("Received request to change user password.");
        userService.changePassword(changePasswordRequestDto, bindingResult);
        log.info("Password changed");
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
