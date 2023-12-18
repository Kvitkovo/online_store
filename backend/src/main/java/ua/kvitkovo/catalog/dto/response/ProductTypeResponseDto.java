package ua.kvitkovo.catalog.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "ProductType")
public class ProductTypeResponseDto {

    @Schema(example = "1", description = "ID product type")
    private Long id;

    @Schema(example = "Гвоздики", description = "Product type name")
    private String name;

    @Schema(example = "Gvozdiki", description = "Product type alias")
    private String alias;

    @Override
    public String toString() {
        return "ProductTypeResponseDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", alias='" + alias + '\'' +
                '}';
    }
}
