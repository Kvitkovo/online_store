package ua.kvitkovo.orders.dto.admin;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "OrderProductAdmin")
public class ProductAdminResponseDto {

    @Schema(example = "1", description = "Product id")
    private Long id;

    @Schema(example = "Букет з гортензіями", description = "Product name")
    private String title;

    @Schema(example = "Buket-z-gortenziyami", description = "Product alias")
    private String alias;
    private int stock;
    private int available;
}
