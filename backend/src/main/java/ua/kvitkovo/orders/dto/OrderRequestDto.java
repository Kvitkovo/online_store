package ua.kvitkovo.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {

    @Schema(example = "Вітаю зі святом!", description = "Postcard text")
    private String postcardText;

    @NotBlank
    @Schema(example = "Andriy", description = "Customer name")
    private String customerName;

    @NotBlank
    @Schema(example = "099-123-45-67", description = "Customer phone")
    private String customerPhone;

    @NotBlank
    @Schema(example = "test@mail.com", description = "Customer email")
    private String customerEmail;

    @Schema(example = "Київ", description = "City of delivery address")
    private String addressCity;

    @Schema(example = "вул. Михайла Грушевського", description = "Street of delivery address")
    private String addressStreet;

    @Schema(example = "30/1", description = "House of delivery address")
    private String addressHouse;

    @Schema(example = "329", description = "Apartment of delivery address")
    private String addressApartment;

    @Schema(example = "Шевченко Олена Олегівна", description = "Receiver name")
    private String receiverName;

    @Schema(example = "099-123-45-00", description = "Receiver phone")
    private String receiverPhone;

    @NotNull
    @Schema(example = "1", description = "Shop ID")
    private Long shopId;

    private Set<OrderItemRequestDto> orderItems;
}
