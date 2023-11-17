package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemCompositionResponseDto {

    @Schema(example = "1", description = "Order item ID")
    private Long id;

    private ProductResponseDto product;

    @Schema(example = "5", description = "Product quantity")
    private int qty;
}
