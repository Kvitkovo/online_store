package ua.kvitkovo.users.dto;

import lombok.Builder;
import lombok.Data;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class UserRequestDto {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;
}
