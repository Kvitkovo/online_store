package ua.kvitkovo.shop.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShopResponseDto {

    @Schema(example = "1", description = "ID shop")
    private Long id;

    @Schema(example = "Kvitkovo", description = "Shop alias")
    private String alias;

    @Schema(example = "Квітково", description = "Shop name")
    private String title;

    @Schema(example = "kvitkovo@mail.com", description = "Shop email")
    private String email;

    @Schema(example = "+38(099)999-99-99", description = "Shop phone")
    private String phone;

    @Schema(example = "м. Київ", description = "Shop phone")
    private String city;

    @Schema(example = "вул. Хрещатик, 36", description = "Shop address")
    private String address;
}
