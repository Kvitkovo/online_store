package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
public class OrderItemResponseDto {

    private Long id;
    private ProductResponseDto product;
    private String productTitle;
    private BigDecimal price;
    private int qty;
    private Set<OrderItemCompositionResponseDto> orderItemsCompositions;

    @Schema(example = "12", description = "Item ID")
    public Long getId() {
        return id;
    }

    public ProductResponseDto getProduct() {
        return product;
    }

    @Schema(example = "500.00", description = "Product price")
    public BigDecimal getPrice() {
        return price;
    }

    @Schema(example = "2", description = "Product quantity")
    public int getQty() {
        return qty;
    }

    @Schema(example = "Власний букет", description = "Product title")
    public String getProductTitle() {
        return productTitle;
    }

    public Set<OrderItemCompositionResponseDto> getOrderItemsCompositions() {
        return orderItemsCompositions;
    }
}
