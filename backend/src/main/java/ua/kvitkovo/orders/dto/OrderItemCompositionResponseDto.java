package ua.kvitkovo.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

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
    private BigDecimal qty;

    public Long getId() {
        return id;
    }

    public ProductResponseDto getProduct() {
        return product;
    }

    public BigDecimal getQty() {
        return qty;
    }
}
