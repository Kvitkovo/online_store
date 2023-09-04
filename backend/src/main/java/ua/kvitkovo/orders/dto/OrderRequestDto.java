package ua.kvitkovo.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {

    private String address;
    private Boolean addPostcard;
    private String postcardText;
    private BigDecimal totalSum;
    private String comment;
}
