package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotBlank
    private String productTitle;
    @NotNull
    private BigDecimal price;
    @NotNull
    private int qty;
    private Set<OrderItemCompositionRequestDto> orderItemsCompositions;

    @Schema(example = "1", description = "Product ID")
    public Long getProductId() {
        return productId;
    }

    @Schema(example = "Власний букет", description = "Product title")
    public String getProductTitle() {
        return productTitle;
    }

    @Schema(example = "1000.50", description = "Product price")
    public BigDecimal getPrice() {
        return price;
    }

    @Schema(example = "2", description = "Product quantity")
    public int getQty() {
        return qty;
    }

    public Set<OrderItemCompositionRequestDto> getOrderItemsCompositions() {
        return orderItemsCompositions;
    }
}
