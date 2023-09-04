package ua.kvitkovo.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.catalog.dto.ProductResponseDto;

import java.math.BigDecimal;
import java.util.Set;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponseDto {

    private Long id;
    private ProductResponseDto product;
    private BigDecimal price;
    private BigDecimal qty;
    private Set<OrderItemCompositionResponseDto> orderItemsCompositions;
}
