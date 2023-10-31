package ua.kvitkovo.decor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.decor.entity.DecorStatus;

import java.time.LocalDateTime;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DecorResponseDto {

    private Long id;
    private LocalDateTime created;
    private LocalDateTime updated;
    private Long managerId;
    private String comment;
    private DecorStatus status;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String addressCity;
    private String addressStreet;
    private String addressHouse;
    private String addressApartment;
    private Long customerId;
    private Long shopId;

    public Long getId() {
        return id;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public LocalDateTime getUpdated() {
        return updated;
    }

    public Long getManagerId() {
        return managerId;
    }

    public String getComment() {
        return comment;
    }

    public DecorStatus getStatus() {
        return status;
    }

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

    public Long getCustomerId() {
        return customerId;
    }

    public Long getShopId() {
        return shopId;
    }
}
