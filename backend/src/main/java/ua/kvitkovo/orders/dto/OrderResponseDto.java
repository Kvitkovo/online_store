package ua.kvitkovo.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.orders.entity.OrderStatus;
import ua.kvitkovo.shop.dto.ShopResponseDto;
import ua.kvitkovo.users.dto.UserResponseDto;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private Long id;
    private Date created;
    private Date updated;
    private UserResponseDto manager;
    private String address;
    private Boolean addPostcard;
    private String postcardText;
    private BigDecimal totalSum;
    private String comment;
    private OrderStatus status;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String addressCity;
    private String addressStreet;
    private String addressHouse;
    private String addressApartment;
    private String receiverName;
    private String receiverPhone;
    private Date dateOfShipment;
    private UserResponseDto customer;
    private ShopResponseDto shop;
}
