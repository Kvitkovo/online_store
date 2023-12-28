package ua.kvitkovo.catalog.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "ProductWithStock")
public class ProductStockResponseDto {

    @Schema(example = "1", description = "Product ID")
    private Long productId;

    @Schema(example = "25", description = "Product stock")
    private int stock;

    @Schema(example = "5", description = "Quantity of products in active orders")
    private int inOrders;

    @Schema(example = "20", description = "Quantity of products available")
    private int available;

    @Override
    public String toString() {
        return "ProductStockResponseDto{" +
                "productId=" + productId +
                ", stock=" + stock +
                ", inOrders=" + inOrders +
                ", available=" + available +
                '}';
    }
}
