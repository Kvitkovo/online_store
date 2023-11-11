package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponseDto {

    @Schema(example = "12", description = "Item ID")
    private Long id;

    private ProductResponseDto product;

    @Schema(example = "Власний букет", description = "Product title")
    private String productTitle;

    @Schema(example = "500.00", description = "Product price")
    private BigDecimal price;

    @Schema(example = "2", description = "Product quantity")
    private int qty;

    private Set<OrderItemCompositionResponseDto> orderItemsCompositions;
}
