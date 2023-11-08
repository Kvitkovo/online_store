package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.*;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemCompositionRequestDto {

    @NotNull
    @Schema(example = "2", description = "Product ID")
    private Long productId;

    @NotNull
    @Schema(example = "5", description = "Product quantity")
    private int qty;
}
