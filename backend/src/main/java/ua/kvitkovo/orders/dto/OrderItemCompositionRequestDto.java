package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemCompositionRequestDto {

    @NotNull
    private Long productId;
    @NotNull
    private int qty;

    @Schema(example = "2", description = "Product ID")
    public Long getProductId() {
        return productId;
    }

    @Schema(example = "5", description = "Product quantity")
    public int getQty() {
        return qty;
    }
}
