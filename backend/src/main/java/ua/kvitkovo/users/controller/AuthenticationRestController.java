package ua.kvitkovo.users.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.kvitkovo.annotations.ApiResponseBadRequest;
import ua.kvitkovo.annotations.ApiResponseSuccessful;
import ua.kvitkovo.annotations.ApiResponseUnauthorized;
import ua.kvitkovo.errorhandling.UserNotVerifiedException;
import ua.kvitkovo.security.jwt.AuthenticationGoogleRequestDto;
import ua.kvitkovo.security.jwt.AuthenticationRequestDto;
import ua.kvitkovo.security.jwt.JwtResponseDto;
import ua.kvitkovo.security.jwt.JwtTokenProvider;
import ua.kvitkovo.users.dto.UserRequestDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserAuthService;
import ua.kvitkovo.users.service.UserService;

import java.time.LocalDateTime;

@Tag(name = "Authentication", description = "the user authentication API")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/auth/")
public class AuthenticationRestController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final UserAuthService userAuthService;

    @Operation(summary = "Login in and returns the authentication token")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = JwtResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @PostMapping("login")
    public ResponseEntity login(@RequestBody AuthenticationRequestDto requestDto) {
        try {
            String username = requestDto.getEmail();
            User user = userService.findByUsername(username);
            if (user == null) {
                throw new UsernameNotFoundException("User with email: " + username + " not found");
            }
            if (!user.isEmailConfirmed()) {
                throw new UserNotVerifiedException("User with email: " + username + " not verified");
            }
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, requestDto.getPassword()));


            String token = jwtTokenProvider.createToken(username, user.getRoles());

            JwtResponseDto response = new JwtResponseDto(username, token, user.getId(), user.getLoginProvider());

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    @Operation(summary = "User Registration", description = "The user registration API creates a user account in application")
    @ApiResponseSuccessful
    @ApiResponseBadRequest
    @PostMapping("register")
    public ResponseEntity register(@RequestBody UserRequestDto requestDto,
                                   BindingResult bindingResult) {
        userAuthService.register(requestDto, bindingResult);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Send confirm code on email", description = "")
    @ApiResponseSuccessful
    @ApiResponseBadRequest
    @PostMapping("send-email-confirm-code")
    public ResponseEntity sendConfirmEmail(@RequestBody AuthenticationRequestDto requestDto) {
        userAuthService.sendConfirmEmail(requestDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Login in and returns the authentication token with Google token")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = JwtResponseDto.class))
    })
    @ApiResponseBadRequest
    @PostMapping("google")
    public ResponseEntity google(@RequestBody AuthenticationGoogleRequestDto requestDto) {
        try {
            User user = userAuthService.loginGoogle(requestDto);
            String token = jwtTokenProvider.createToken(user.getEmail(), user.getRoles());
            JwtResponseDto response = new JwtResponseDto(user.getEmail(), token, user.getId(), user.getLoginProvider());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid token");
        }
    }
}
