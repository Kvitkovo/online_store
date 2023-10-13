package ua.kvitkovo.catalog.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SizeResponseDto {


    private Long id;
    private String name;
    private String alias;
    private int min;
    private int max;

    @Schema(example = "1", description = "Size id")
    public Long getId() {
        return id;
    }

    @Schema(example = "35 - 65 см", description = "Size name")
    public String getName() {
        return name;
    }

    @Schema(example = "35--65-sm", description = "Size alias")
    public String getAlias() {
        return alias;
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
