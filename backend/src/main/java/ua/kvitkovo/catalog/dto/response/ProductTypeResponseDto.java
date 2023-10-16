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
public class ProductTypeResponseDto {


    private Long id;
    private String name;
    private String alias;

    @Schema(example = "1", description = "ID product type")
    public Long getId() {
        return id;
    }

    @Schema(example = "Гвоздики", description = "Product type name")
    public String getName() {
        return name;
    }

    @Schema(example = "Gvozdiki", description = "Product type alias")
    public String getAlias() {
        return alias;
    }
}
