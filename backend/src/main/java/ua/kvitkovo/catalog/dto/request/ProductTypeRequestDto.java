package ua.kvitkovo.catalog.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "ProductTypeRequest")
public class ProductTypeRequestDto {

    @NotBlank
    @Size(min = 1, max = 255, message
            = "name must be between 1 and 255 characters")
    @Schema(example = "Гвоздики", description = "Product type name")
    private String name;
}
