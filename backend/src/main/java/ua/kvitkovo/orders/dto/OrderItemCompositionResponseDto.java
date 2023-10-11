package ua.kvitkovo.orders.dto;

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
public class OrderItemCompositionResponseDto {

    private Long id;
    private ProductResponseDto product;
    private int qty;

    public Long getId() {
        return id;
    }

    public ProductResponseDto getProduct() {
        return product;
    }

    public int getQty() {
        return qty;
    }
}
