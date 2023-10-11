package ua.kvitkovo.catalog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
public class ProductTypeRequestDto {

    @NotBlank
    @Size(min = 1, max = 255, message
            = "name must be between 1 and 255 characters")
    private String name;

    @Schema(example = "Гвоздики", description = "Product type name")
    public String getName() {
        return name;
    }
}
