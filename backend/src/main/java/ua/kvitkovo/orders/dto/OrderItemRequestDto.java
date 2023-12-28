package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "OrderItemRequest")
public class OrderItemRequestDto {

    @Schema(example = "1", description = "Product ID")
    private Long productId;

    @NotBlank
    @Schema(example = "Власний букет", description = "Product title")
    private String productTitle;

    @NotNull
    @Schema(example = "1000.50", description = "Product price")
    private BigDecimal price;

    @NotNull
    @Schema(example = "2", description = "Product quantity")
    private int qty;
    private Set<OrderItemCompositionRequestDto> orderItemsCompositions;
}
