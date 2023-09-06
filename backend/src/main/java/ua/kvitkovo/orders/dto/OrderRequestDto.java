package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    private String postcardText;
    @NotBlank
    private String customerName;
    @NotBlank
    private String customerPhone;
    @NotBlank
    private String customerEmail;
    private String addressCity;
    private String addressStreet;
    private String addressHouse;
    private String addressApartment;
    private String receiverName;
    private String receiverPhone;
    @NotNull
    private Long shopId;
    private Set<OrderItemRequestDto> orderItems;

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
