package ua.kvitkovo.orders.dto.admin;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.orders.dto.OrderItemRequestDto;
import ua.kvitkovo.orders.entity.OrderStatus;

import java.util.Date;
import java.util.Set;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    private String comment;
    @NotNull
    private Long shopId;
    @NotNull
    private Long managerId;
    private Date dateOfShipment;
    private OrderStatus status;
    private Set<OrderItemRequestDto> orderItems;

    @Schema(example = "Відправити терміново. Доставка на дргуий поверх. Домофон 1234.", description = "Order comment")
    public String getComment() {
        return comment;
    }

    @Schema(example = "1", description = "Manager ID")
    public Long getManagerId() {
        return managerId;
    }

    @Schema(example = "2023-09-06T15:00:00", description = "Order delivery date")
    public Date getDateOfShipment() {
        return dateOfShipment;
    }

    public OrderStatus getStatus() {
        return status;
    }

    @Schema(example = "Вітаю зі святом!", description = "Postcard text")
    public String getPostcardText() {
        return postcardText;
    }

    @Schema(example = "Andriy", description = "Customer name")
    public String getCustomerName() {
        return customerName;
    }

    @Schema(example = "099-123-45-67", description = "Customer phone")
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

    @Schema(example = "099-123-45-00", description = "Receiver phone")
    public String getReceiverPhone() {
        return receiverPhone;
    }

    @Schema(example = "1", description = "Shop ID")
    public Long getShopId() {
        return shopId;
    }

    public Set<OrderItemRequestDto> getOrderItems() {
        return orderItems;
    }
}
