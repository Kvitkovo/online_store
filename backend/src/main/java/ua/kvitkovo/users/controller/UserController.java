package ua.kvitkovo.users.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
}
