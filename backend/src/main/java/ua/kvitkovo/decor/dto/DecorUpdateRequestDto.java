package ua.kvitkovo.decor.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;
import ua.kvitkovo.decor.entity.DecorStatus;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "DecorUpdateRequest")
public class DecorUpdateRequestDto {

    @NotBlank
    @Size(max = 255, message = "customerName must be less than 255 characters.")
    @Schema(example = "Andriy", description = "Customer name")
    private String customerName;

    @NotBlank
    @Pattern(regexp = "^\\+380\\d{3}\\d{2}\\d{2}\\d{2}$")
    private String customerPhone;

    @NotBlank
    @Size(max = 255, message = "customerEmail must be less than 255 characters.")
    @Pattern(regexp = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$")
    @Schema(example = "test@mail.com", description = "Customer email")
    private String customerEmail;

    @Size(max = 255, message = "addressCity must be less than 255 characters.")
    @Schema(example = "Podilsk")
    private String addressCity;

    @Size(max = 255, message = "addressStreet must be less than 255 characters.")
    @Schema(example = "Soborna")
    private String addressStreet;

    @Size(max = 255, message = "addressHouse must be less than 255 characters.")
    @Schema(example = "12")
    private String addressHouse;

    @Size(max = 255, message = "addressApartment must be less than 255 characters.")
    @Schema(example = "25")
    private String addressApartment;

    @Size(max = 255, message = "comment must be less than 255 characters.")
    @Schema(example = "Потрібно прикрасити дитяче свято")
    private String comment;

    @NotNull
    @NotNull
    @Min(value = 1, message = "shopId should not be less than 1")
    @Schema(example = "1", description = "Shop ID")
    private Long shopId;

    private DecorStatus status;
}
