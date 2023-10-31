package ua.kvitkovo.decor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class DecorRequestDto {

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
    private String comment;
    @NotNull
    private Long shopId;

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public String getAddressCity() {
        return addressCity;
    }

    public String getAddressStreet() {
        return addressStreet;
    }

    public String getAddressHouse() {
        return addressHouse;
    }

    public String getAddressApartment() {
        return addressApartment;
    }

    public Long getShopId() {
        return shopId;
    }

    public String getComment() {
        return comment;
    }
}
