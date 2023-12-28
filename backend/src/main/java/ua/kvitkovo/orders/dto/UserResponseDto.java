package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "OrderUser")
public class UserResponseDto {

    @Schema(example = "1", description = "User ID")
    private long id;

    @Schema(example = "Шевченко", description = "User first name")
    private String firstName;

    @Schema(example = "Олена", description = "User last name")
    private String lastName;

    @Schema(example = "test@mail.com", description = "User email")
    private String email;

    @Schema(example = "099-123-45-67", description = "User phone")
    private String phone;
}
