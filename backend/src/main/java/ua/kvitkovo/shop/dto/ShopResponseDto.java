package ua.kvitkovo.shop.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
public class ShopResponseDto {

    private Long id;
    private String alias;
    private String title;
    private String email;
    private String phone;
    private String city;
    private String address;

    @Schema(example = "1", description = "ID shop")
    public Long getId() {
        return id;
    }

    @Schema(example = "Kvitkovo", description = "Shop alias")
    public String getAlias() {
        return alias;
    }

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

    public void setId(Long id) {
        this.id = id;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
