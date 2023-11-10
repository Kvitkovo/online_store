package ua.kvitkovo.decor.dto;

import lombok.*;
import ua.kvitkovo.decor.entity.DecorStatus;

import java.time.LocalDateTime;

/**
 * @author Andriy Gaponov
 */
@Setter
@Getter
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
}
