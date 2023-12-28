package ua.kvitkovo.orders.dto.admin;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "OrderItemAdmin")
public class OrderItemAdminResponseDto {

    @Schema(example = "12", description = "Item ID")
    private Long id;
    private ProductAdminResponseDto product;

    @Schema(example = "Власний букет", description = "Product title")
    private String productTitle;

    @Schema(example = "500.00", description = "Product price")
    private BigDecimal price;

    @Schema(example = "2", description = "Product quantity")
    private int qty;
    private Set<OrderItemCompositionAdminResponseDto> orderItemsCompositions;
}
