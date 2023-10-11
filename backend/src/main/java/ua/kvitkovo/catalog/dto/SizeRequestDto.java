package ua.kvitkovo.catalog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SizeRequestDto {

    @NotBlank(message = "The 'name' cannot be empty")
    @Size(min = 1, max = 255, message
            = "name must be between 1 and 255 characters")
    private String name;
    @Min(value = 0, message = "The value must be positive")
    private int min;
    @Min(value = 0, message = "The value must be positive")
    private int max;

    @Schema(example = "35 - 65 см", description = "Size name")
    public String getName() {
        return name;
    }

    @Schema(example = "35", description = "Minimum size value in sm")
    public int getMin() {
        return min;
    }

    @Schema(example = "65", description = "Maximum size value in sm")
    public int getMax() {
        return max;
    }
}
