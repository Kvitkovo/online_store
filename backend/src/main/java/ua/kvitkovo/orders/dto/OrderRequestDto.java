package ua.kvitkovo.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {

    private Boolean addPostcard;
    private String postcardText;
    private String comment;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String addressCity;
    private String addressStreet;
    private String addressHouse;
    private String addressApartment;
    private String receiverName;
    private String receiverPhone;
    private Long shopId;
    private Set<OrderItemRequestDto> orderItems;
}
