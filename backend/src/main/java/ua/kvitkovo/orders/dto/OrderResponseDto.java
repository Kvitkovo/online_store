package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.orders.entity.OrderStatus;
import ua.kvitkovo.shop.dto.ShopResponseDto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private Long id;
    private LocalDateTime created;
    private LocalDateTime updated;
    private UserResponseDto manager;
    private String address;
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
    private LocalDateTime dateOfShipment;
    private UserResponseDto customer;
    private ShopResponseDto shop;
    private Set<OrderItemResponseDto> orderItems;

    public Set<OrderItemResponseDto> getOrderItems() {
        return orderItems;
    }

    @Schema(example = "24", description = "Order ID")
    public Long getId() {
        return id;
    }

    @Schema(example = "2023-09-06T11:00:52.525", description = "Order creation date")
    public LocalDateTime getCreated() {
        return created;
    }

    @Schema(example = "2023-09-06T11:00:52.525", description = "Order update date")
    public LocalDateTime getUpdated() {
        return updated;
    }

    public UserResponseDto getManager() {
        return manager;
    }

    @Schema(example = "Київ, вул. Михайла Грушевського, 30/1, 329", description = "Delivery address")
    public String getAddress() {
        return address;
    }

    @Schema(example = "Вітаю зі святом!", description = "Postcard text")
    public String getPostcardText() {
        return postcardText;
    }

    @Schema(example = "2000.00", description = "Order total sum")
    public BigDecimal getTotalSum() {
        return totalSum;
    }

    @Schema(example = "підняти на другий поверх", description = "Order comment")
    public String getComment() {
        return comment;
    }

    public OrderStatus getStatus() {
        return status;
    }

    @Schema(example = "Andriy", description = "Customer name")
    public String getCustomerName() {
        return customerName;
    }

    @Schema(example = "099-123-45-67", description = "Customer phone number")
    public String getCustomerPhone() {
        return customerPhone;
    }

    @Schema(example = "test@mail.com", description = "Customer email")
    public String getCustomerEmail() {
        return customerEmail;
    }

    @Schema(example = "Київ", description = "City of delivery address")
    public String getAddressCity() {
        return addressCity;
    }

    @Schema(example = "вул. Михайла Грушевського", description = "Street of delivery address")
    public String getAddressStreet() {
        return addressStreet;
    }

    @Schema(example = "30/1", description = "House of delivery address")
    public String getAddressHouse() {
        return addressHouse;
    }

    @Schema(example = "329", description = "Apartment of delivery address")
    public String getAddressApartment() {
        return addressApartment;
    }

    @Schema(example = "Шевченко Олена Олегівна", description = "Receiver name")
    public String getReceiverName() {
        return receiverName;
    }

    @Schema(example = "099-123-45-00", description = "Receiver phone number")
    public String getReceiverPhone() {
        return receiverPhone;
    }

    @Schema(example = "2023-09-06T15:00:00.525", description = "Order delivery date")
    public LocalDateTime getDateOfShipment() {
        return dateOfShipment;
    }

    public UserResponseDto getCustomer() {
        return customer;
    }

    public ShopResponseDto getShop() {
        return shop;
    }
}
