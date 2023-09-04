package ua.kvitkovo.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemRequestDto {

    private Long productId;
    private BigDecimal price;
    private BigDecimal qty;
    private Set<OrderItemCompositionRequestDto> orderItemsCompositions;
}
