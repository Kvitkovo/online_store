package ua.kvitkovo.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShopResponseDto {

    private Long id;
    private String alias;
    private String title;
    private String email;
    private String phone;
    private String city;
    private String address;
}
