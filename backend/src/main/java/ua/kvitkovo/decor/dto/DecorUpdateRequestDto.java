package ua.kvitkovo.decor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import ua.kvitkovo.decor.entity.DecorStatus;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DecorUpdateRequestDto {

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
    private DecorStatus status;
}
