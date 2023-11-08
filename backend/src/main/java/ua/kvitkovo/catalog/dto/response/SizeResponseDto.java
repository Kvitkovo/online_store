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
public class SizeResponseDto {

    @Schema(example = "1", description = "Size id")
    private Long id;

    @Schema(example = "35 - 65 см", description = "Size name")
    private String name;

    @Schema(example = "35--65-sm", description = "Size alias")
    private String alias;

    @Schema(example = "35", description = "Minimum size value in sm")
    private int min;

    @Schema(example = "65", description = "Maximum size value in sm")
    private int max;

    @Override
    public String toString() {
        return "SizeResponseDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", alias='" + alias + '\'' +
                ", min=" + min +
                ", max=" + max +
                '}';
    }
}
