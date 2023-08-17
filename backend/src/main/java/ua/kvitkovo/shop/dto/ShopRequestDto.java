package ua.kvitkovo.shop.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
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
public class ShopRequestDto {

    @NotBlank
    private String title;
    private String email;
    private String phone;
    private String city;
    private String address;

    @Schema(example = "Квітково", description = "Shop name")
    public String getTitle() {
        return title;
    }

    @Schema(example = "kvitkovo@mail.com", description = "Shop email")
    public String getEmail() {
        return email;
    }

    @Schema(example = "+38(099)999-99-99", description = "Shop phone")
    public String getPhone() {
        return phone;
    }

    @Schema(example = "м. Київ", description = "Shop phone")
    public String getCity() {
        return city;
    }

    @Schema(example = "вул. Хрещатик, 36", description = "Shop address")
    public String getAddress() {
        return address;
    }
}
