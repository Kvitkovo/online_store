package ua.kvitkovo.orders.dto.admin;

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
public class OrderItemAdminResponseDto {

    private Long id;
    private ProductAdminResponseDto product;
    private String productTitle;
    private BigDecimal price;
    private int qty;
    private Set<OrderItemCompositionAdminResponseDto> orderItemsCompositions;

    @Schema(example = "12", description = "Item ID")
    public Long getId() {
        return id;
    }

    public ProductAdminResponseDto getProduct() {
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

    public Set<OrderItemCompositionAdminResponseDto> getOrderItemsCompositions() {
        return orderItemsCompositions;
    }
}
