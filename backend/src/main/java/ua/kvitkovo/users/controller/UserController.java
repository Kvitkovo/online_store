package ua.kvitkovo.users.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ua.kvitkovo.annotations.ApiResponseBadRequest;
import ua.kvitkovo.annotations.ApiResponseForbidden;
import ua.kvitkovo.annotations.ApiResponseNotFound;
import ua.kvitkovo.annotations.ApiResponseSuccessful;
import ua.kvitkovo.annotations.ApiResponseUnauthorized;
import ua.kvitkovo.security.jwt.JwtResponseDto;
import ua.kvitkovo.security.jwt.JwtTokenProvider;
import ua.kvitkovo.users.converter.UserDtoMapper;
import ua.kvitkovo.users.dto.*;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserAuthService;
import ua.kvitkovo.users.service.UserService;

@Tag(name = "Users", description = "the users API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/users")
public class UserController {

    private final UserService userService;
    private final UserAuthService userAuthService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserDtoMapper userMapper;

    @Operation(summary = "Get User by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = UserResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @GetMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id or hasRole('ROLE_ADMIN')")
    public UserResponseDto getUserById(
            @Parameter(description = "The ID of the user to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to get the User with id - {}.", id);
        User user = userService.findById(id);
        log.debug("the Size with id - {} was retrieved - {}.", id, user);
        return userMapper.mapEntityToDto(user);
    }

    @Operation(summary = "Get all Client by Page")
    @ApiResponseSuccessful
    @ApiResponseNotFound
    @GetMapping(path = "/clients")
    public Page<UserResponseDto> getClients(@RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "30") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<User> users = userService.getClientsByPage(pageable);
        return users.map(userMapper::mapEntityToDto);
    }

    @Operation(summary = "Get all employees by Page")
    @ApiResponseSuccessful
    @ApiResponseNotFound
    @GetMapping(path = "/employees")
    public Page<UserResponseDto> getEmployees(@RequestParam(defaultValue = "1") int page,
                                              @RequestParam(defaultValue = "30") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<User> users = userService.getEmployeesByPage(pageable);
        return users.map(userMapper::mapEntityToDto);
    }

    @Operation(summary = "Confirm user email")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = JwtResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/email/{code}/confirm")
    public ResponseEntity<JwtResponseDto> confirmEmail(
            @Parameter(description = "Verification code", required = true,
                    schema = @Schema(type = "string")
            )
            @PathVariable String code) {
        log.debug("Received request to confirm user mail with Verification code - {}.", code);
        User user = userAuthService.confirmEmail(code);
        log.debug("Email confirmed");
        String token = jwtTokenProvider.createToken(user.getEmail(), user.getRoles());
        JwtResponseDto response = new JwtResponseDto(user.getEmail(), token, user.getId());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Send request to reset user password")
    @ApiResponseSuccessful
    @ApiResponseNotFound
    @PostMapping("/resetPassword/{email}")
    public ResponseEntity<Void> sendResetPassword(
            @Parameter(description = "Email of the user whose password needs to be reset", required = true,
                    schema = @Schema(type = "string")
            )
            @PathVariable String email) {
        log.debug("Received request to reset password with email - {}.", email);
        userAuthService.sendResetPassword(email);
        log.debug("Email send to {} for reset password", email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Reset user password")
    @ApiResponseSuccessful
    @ApiResponseBadRequest
    @ApiResponseNotFound
    @PostMapping("/resetPassword")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordRequestDto requestDto,
                                              BindingResult bindingResult) {
        log.debug("Received request to reset user password with Verification code.");
        userAuthService.resetPassword(requestDto, bindingResult);
        log.debug("Password reset");
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Change user password")
    @ApiResponseSuccessful
    @ApiResponseBadRequest
    @PostMapping("/changePassword")
    public ResponseEntity<Void> changePassword(
            @RequestBody ChangePasswordRequestDto changePasswordRequestDto,
            BindingResult bindingResult) {
        log.debug("Received request to change user password.");
        userAuthService.changePassword(changePasswordRequestDto, bindingResult);
        log.debug("Password changed");
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Delete User by ID")
    @ApiResponseSuccessful
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @DeleteMapping("/{id}")
    @PreAuthorize("#id != authentication.principal.id and hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteUser(
            @Parameter(description = "The ID of the user to delete", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to delete User with id - {}.", id);
        userService.delete(id);
        log.debug("the User with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Enable User by ID")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = UserResponseDto.class))
    })
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{id}/enable")
    @PreAuthorize("#id != authentication.principal.id and hasRole('ROLE_ADMIN')")
    public UserResponseDto enableUser(
            @Parameter(description = "The ID of the user to enable", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to enable User with id {}.", id);
        User user = userService.enableUser(id);
        return userMapper.mapEntityToDto(user);
    }

    @Operation(summary = "Disable User by ID")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = UserResponseDto.class))
    })
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{id}/disable")
    @PreAuthorize("#id != authentication.principal.id and hasRole('ROLE_ADMIN')")
    public UserResponseDto disableUser(
            @Parameter(description = "The ID of the user to disable", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.debug("Received request to disable User with id {}.", id);
        User user = userService.disableUser(id);
        return userMapper.mapEntityToDto(user);
    }

    @Operation(summary = "Create a new User", description = "Create new users application")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = UserResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @PostMapping
    public UserResponseDto addUser(@RequestBody CreateUserRequestDto requestDto,
                                   BindingResult bindingResult) {
        return userAuthService.addUser(requestDto, bindingResult);
    }

    @Operation(summary = "Update User by ID")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = UserResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id or hasRole('ROLE_ADMIN')")
    public UserResponseDto updateUser(
            @RequestBody @NotNull(message = "Request body is mandatory") final UpdateUserRequestDto request,
            @Parameter(description = "The ID of the user to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update User - {} with id {}.", request, id);
        return userAuthService.updateUser(id, request, bindingResult);
    }

    @Operation(summary = "Update User by ID from admin panel")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = UserResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/employee/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserResponseDto updateAdminUser(
            @RequestBody @NotNull(message = "Request body is mandatory") final EmployeeUpdateRequestDto request,
            @Parameter(description = "The ID of the user to update", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update User - {} with id {}.", request, id);
        return userAuthService.updateEmployee(id, request, bindingResult);
    }
}
