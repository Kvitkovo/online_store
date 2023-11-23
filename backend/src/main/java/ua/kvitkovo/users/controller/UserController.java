package ua.kvitkovo.users.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.security.jwt.JwtResponseDto;
import ua.kvitkovo.security.jwt.JwtTokenProvider;
import ua.kvitkovo.users.dto.ChangePasswordRequestDto;
import ua.kvitkovo.users.dto.CreateUserRequestDto;
import ua.kvitkovo.users.dto.EmployeeUpdateRequestDto;
import ua.kvitkovo.users.dto.ResetPasswordRequestDto;
import ua.kvitkovo.users.dto.UserRequestDto;
import ua.kvitkovo.users.dto.UserResponseDto;
import ua.kvitkovo.users.entity.User;
import ua.kvitkovo.users.service.UserAuthService;
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
    private final UserAuthService userAuthService;
    private final JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "Get User by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = UserResponseDto.class))
        }),
        @ApiResponse(responseCode = "404", description = "User not found", content = {
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
        })
    })
    @GetMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id or hasRole('ROLE_ADMIN')")
    @ResponseBody
    public UserResponseDto getUserById(
        @Parameter(description = "The ID of the user to retrieve", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id) {
        log.debug("Received request to get the User with id - {}.", id);
        UserResponseDto user = userService.findById(id);
        log.debug("the Size with id - {} was retrieved - {}.", id, user);
        return user;
    }

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

    @Operation(summary = "Get all employees by Page")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "404", description = "If clients don't exist in the Data Base"),
    })
    @GetMapping(path = "/employees")
    public Page<UserResponseDto> getEmployees(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "30") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return userService.getEmployeesByPage(pageable);
    }

    @Operation(summary = "Confirm user email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully authenticated", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = JwtResponseDto.class))
        }),
        @ApiResponse(responseCode = "404", description = "Verification code not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @GetMapping("/email/{code}/confirm")
    @ResponseBody
    public ResponseEntity confirmEmail(
        @Parameter(description = "Verification code", required = true,
            schema = @Schema(type = "string")
        )
        @PathVariable String code) {
        log.debug("Received request to confirm user mail with Verification code - {}.", code);
        User user = userAuthService.confirmEmail(code);
        log.debug("Email confirmed");
        String token = jwtTokenProvider.createToken(user.getEmail(), user.getRoles());
        JwtResponseDto response = new JwtResponseDto(user.getEmail(), token);
        return ResponseEntity.ok(response);
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
        log.debug("Received request to reset password with email - {}.", email);
        userAuthService.sendResetPassword(email);
        log.debug("Email send to {} for reset password", email);
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
        log.debug("Received request to reset user password with Verification code.");
        userAuthService.resetPassword(requestDto, bindingResult);
        log.debug("Password reset");
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
    public ResponseEntity<Void> changePassword(
        @RequestBody ChangePasswordRequestDto changePasswordRequestDto,
        BindingResult bindingResult) {
        log.debug("Received request to change user password.");
        userAuthService.changePassword(changePasswordRequestDto, bindingResult);
        log.debug("Password changed");
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Delete User by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        }),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        }),
        @ApiResponse(responseCode = "404", description = "Size not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("#id != authentication.principal.id and hasRole('ROLE_ADMIN')")
    @ResponseBody
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
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        }),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        }),
        @ApiResponse(responseCode = "404", description = "User not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{id}/enable")
    @PreAuthorize("#id != authentication.principal.id and hasRole('ROLE_ADMIN')")
    @ResponseBody
    public UserResponseDto enableUser(
        @Parameter(description = "The ID of the user to enable", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id) {
        log.debug("Received request to enable User with id {}.", id);
        return userService.enableUser(id);
    }

    @Operation(summary = "Disable User by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        }),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        }),
        @ApiResponse(responseCode = "404", description = "User not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{id}/disable")
    @PreAuthorize("#id != authentication.principal.id and hasRole('ROLE_ADMIN')")
    @ResponseBody
    public UserResponseDto disableUser(
        @Parameter(description = "The ID of the user to disable", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id) {
        log.debug("Received request to disable User with id {}.", id);
        return userService.disableUser(id);
    }

    @Operation(summary = "Create a new User", description = "Create new users application")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "400", description = "The User has already been added " +
            "or some data is missing",
            content = {
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
    })
    @PostMapping
    public UserResponseDto addUser(@RequestBody CreateUserRequestDto requestDto,
        BindingResult bindingResult) {
        return userAuthService.addUser(requestDto, bindingResult);
    }

    @Operation(summary = "Update User by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = UserResponseDto.class))
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
        @ApiResponse(responseCode = "404", description = "Size not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id or hasRole('ROLE_ADMIN')")
    @ResponseBody
    public UserResponseDto updateUser(
        @RequestBody @NotNull(message = "Request body is mandatory") final UserRequestDto request,
        @Parameter(description = "The ID of the user to update", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update User - {} with id {}.", request, id);
        return userAuthService.updateUser(id, request, bindingResult);
    }

    @Operation(summary = "Update User by ID from admin panel")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = UserResponseDto.class))
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
        @ApiResponse(responseCode = "404", description = "Size not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @PutMapping("/employee/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    public UserResponseDto updateAdminUser(
        @RequestBody @NotNull(message = "Request body is mandatory") final EmployeeUpdateRequestDto request,
        @Parameter(description = "The ID of the user to update", required = true,
            schema = @Schema(type = "integer", format = "int64")
        )
        @PathVariable Long id, BindingResult bindingResult) {
        log.debug("Received request to update User - {} with id {}.", request, id);
        return userAuthService.updateEmployee(id, request, bindingResult);
    }

    @PostMapping("/test")
    @ResponseBody
    public ResponseEntity<Void> test() {
        userAuthService.test();
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
