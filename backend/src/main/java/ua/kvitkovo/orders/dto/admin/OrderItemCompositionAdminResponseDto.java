package ua.kvitkovo.orders.dto.admin;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "OrderItemCompositionAdmin")
public class OrderItemCompositionAdminResponseDto {

    private Long id;
    private ProductAdminResponseDto product;
    private int qty;
}
