package ua.kvitkovo.catalog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductTypeRequestDto {

    @NotBlank
    private String name;

    @Schema(example = "Гвоздики", description = "Product type name")
    public String getName() {
        return name;
    }
}
