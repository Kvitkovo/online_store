package ua.kvitkovo.users.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.kvitkovo.users.entity.UserStatus;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private UserStatus status;
}
