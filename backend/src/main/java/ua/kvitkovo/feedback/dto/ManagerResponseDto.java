package ua.kvitkovo.feedback.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Manager")
public class ManagerResponseDto {

    @Schema(example = "1", description = "Manager ID")
    private long id;

    @Schema(example = "Admin", description = "Manager first name")
    private String firstName;

    @Schema(example = "Admin", description = "Manager last name")
    private String lastName;

    @Schema(example = "admin@mail.com", description = "Manager email")
    private String email;
}
