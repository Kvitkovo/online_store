package ua.kvitkovo.catalog.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SizeRequestDto {

    @NotBlank(message = "The 'name' cannot be empty")
    @Size(min = 1, max = 255, message
            = "name must be between 1 and 255 characters")
    @Schema(example = "35 - 65 см", description = "Size name")
    private String name;

    @Min(value = 0, message = "The value must be positive")
    @Schema(example = "35", description = "Minimum size value in sm")
    private int min;

    @Min(value = 0, message = "The value must be positive")
    @Schema(example = "65", description = "Maximum size value in sm")
    private int max;
}
