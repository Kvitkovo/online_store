package ua.kvitkovo.orders.dto.admin;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;
import ua.kvitkovo.orders.dto.OrderItemRequestDto;
import ua.kvitkovo.orders.entity.Delivery;
import ua.kvitkovo.orders.entity.OrderStatus;

import java.util.Date;
import java.util.Set;
import ua.kvitkovo.orders.entity.Pay;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "OrderAdminRequest")
public class OrderAdminRequestDto {

    @Size(max = 100, message = "postcardText must be less than 100 characters.")
    @Schema(example = "Вітаю зі святом!", description = "Postcard text")
    private String postcardText;

    @NotBlank
    @Size(max = 255, message = "customerName must be less than 255 characters.")
    @Schema(example = "Andriy", description = "Customer name")
    private String customerName;

    @NotBlank
    @Size(max = 255, message = "customerPhone must be less than 255 characters.")
    @Pattern(regexp = "^\\+380\\d{3}\\d{2}\\d{2}\\d{2}$")
    @Schema(example = "+380991234567", description = "Customer phone")
    private String customerPhone;

    @NotBlank
    @Size(max = 255, message = "customerEmail must be less than 255 characters.")
    @Pattern(regexp = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$")
    @Schema(example = "test@mail.com", description = "Customer email")
    private String customerEmail;

    @Size(max = 255, message = "addressCity must be less than 255 characters.")
    @Schema(example = "Київ", description = "City of delivery address")
    private String addressCity;

    @Size(max = 255, message = "addressStreet must be less than 255 characters.")
    @Schema(example = "вул. Михайла Грушевського", description = "Street of delivery address")
    private String addressStreet;

    @Size(max = 255, message = "addressHouse must be less than 255 characters.")
    @Schema(example = "30/1", description = "House of delivery address")
    private String addressHouse;

    @Size(max = 255, message = "addressApartment must be less than 255 characters.")
    @Schema(example = "329", description = "Apartment of delivery address")
    private String addressApartment;

    @Size(max = 255, message = "receiverName must be less than 255 characters.")
    @Schema(example = "Шевченко Олена Олегівна", description = "Receiver name")
    private String receiverName;

    @Size(max = 255, message = "receiverPhone must be less than 255 characters.")
    @Pattern(regexp = "^\\+380\\d{3}\\d{2}\\d{2}\\d{2}$")
    @Schema(example = "+380991234500", description = "Receiver phone")
    private String receiverPhone;

    @Schema(example = "Відправити терміново. Доставка на дргуий поверх. Домофон 1234.", description = "Order comment")
    private String comment;

    @NotNull
    @Min(value = 0, message = "shopId should not be less than 0")
    private Long shopId;

    @NotNull
    @Min(value = 0, message = "managerId should not be less than 0")
    @Schema(example = "1", description = "Manager ID")
    private Long managerId;

    @Schema(example = "2023-09-06T15:00:00", description = "Order delivery date")
    private Date dateOfShipment;
    private OrderStatus status;
    @NotNull
    private Delivery delivery;
    @NotNull
    private Pay pay;
    private Set<OrderItemRequestDto> orderItems;
}
