package ua.kvitkovo.catalog.dto;

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
public class ProductStockResponseDto {

    private Long productId;
    private int stock;
    private int inOrders;
    private int available;

    public int getInOrders() {
        return inOrders;
    }

    public Long getProductId() {
        return productId;
    }

    public int getStock() {
        return stock;
    }

    public int getAvailable() {
        return available;
    }
}
