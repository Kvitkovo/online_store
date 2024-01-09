package ua.kvitkovo.orders.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import ua.kvitkovo.orders.entity.Delivery;
import ua.kvitkovo.orders.entity.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import ua.kvitkovo.orders.entity.Pay;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Order")
public class OrderResponseDto {

    @Schema(example = "24", description = "Order ID")
    private Long id;

    @Schema(example = "2023-09-06T11:00:52.525", description = "Order creation date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created;

    @Schema(example = "2023-09-06T11:00:52.525", description = "Order update date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updated;

    @Schema(example = "1", description = "Manager ID")
    private Long managerId;

    @Schema(example = "Київ, вул. Михайла Грушевського, 30/1, 329", description = "Delivery address")
    private String address;

    @Schema(example = "Вітаю зі святом!", description = "Postcard text")
    private String postcardText;

    @Schema(example = "2000.00", description = "Order total sum")
    private BigDecimal totalSum;

    @Schema(example = "підняти на другий поверх", description = "Order comment")
    private String comment;

    @Schema(example = "ACCEPT", description = "Order status")
    private OrderStatus status;

    @Schema(example = "Andriy", description = "Customer name")
    private String customerName;

    @Schema(example = "099-123-45-67", description = "Customer phone number")
    private String customerPhone;

    @Schema(example = "test@mail.com", description = "Customer email")
    private String customerEmail;

    @Schema(example = "Київ", description = "City of delivery address")
    private String addressCity;

    @Schema(example = "вул. Михайла Грушевського", description = "Street of delivery address")
    private String addressStreet;

    @Schema(example = "30/1", description = "House of delivery address")
    private String addressHouse;

    @Schema(example = "329", description = "Apartment of delivery address")
    private String addressApartment;

    @Schema(example = "Шевченко Олена Олегівна", description = "Receiver name")
    private String receiverName;

    @Schema(example = "099-123-45-00", description = "Receiver phone number")
    private String receiverPhone;

    @Schema(example = "2023-09-06T15:00:00.525", description = "Order delivery date")
    private LocalDateTime dateOfShipment;

    @Schema(example = "1", description = "Customer ID")
    private Long customerId;

    @Schema(example = "1", description = "Shop ID")
    private Long shopId;

    private Delivery delivery;
    private Pay pay;

    private Set<OrderItemResponseDto> orderItems;
}
