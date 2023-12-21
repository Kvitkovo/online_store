package ua.kvitkovo.shop.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "ShopRequest")
public class ShopRequestDto {

    @NotBlank
    @Size(min = 1, max = 255, message
            = "title must be between 1 and 255 characters")
    @Schema(example = "Квітково", description = "Shop name")
    private String title;

    @Schema(example = "kvitkovo@mail.com", description = "Shop email")
    @Size(min = 1, max = 255, message
            = "title must be between 1 and 255 characters")
    private String email;

    @Schema(example = "+38(099)999-99-99", description = "Shop phone")
    @Size(min = 1, max = 255, message
            = "phone must be between 1 and 255 characters")
    private String phone;

    @Schema(example = "м. Київ", description = "Shop phone")
    @Size(min = 1, max = 255, message
            = "city must be between 1 and 255 characters")
    private String city;

    @Schema(example = "вул. Хрещатик, 36", description = "Shop address")
    @Size(min = 1, max = 255, message
            = "address must be between 1 and 255 characters")
    private String address;
}
