package ua.kvitkovo.shop.dto;

import lombok.Builder;
import lombok.Data;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class ShopRequestDto {

    private String title;
    private String email;
    private String phone;
    private String city;
    private String address;
}
