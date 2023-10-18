package ua.kvitkovo.orders.dto.admin;

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
public class OrderItemCompositionAdminResponseDto {

    private Long id;
    private ProductAdminResponseDto product;
    private int qty;

    public Long getId() {
        return id;
    }

    public ProductAdminResponseDto getProduct() {
        return product;
    }

    public int getQty() {
        return qty;
    }
}
