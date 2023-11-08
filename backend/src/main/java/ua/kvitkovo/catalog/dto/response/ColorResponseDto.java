package ua.kvitkovo.catalog.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ColorResponseDto {

    @Schema(example = "1", description = "ID color")
    private Long id;

    @Schema(example = "Зелений", description = "Color name")
    private String name;

    @Schema(example = "Zelenij", description = "Color alias")
    private String alias;

    @Override
    public String toString() {
        return "ColorResponseDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", alias='" + alias + '\'' +
                '}';
    }
}
