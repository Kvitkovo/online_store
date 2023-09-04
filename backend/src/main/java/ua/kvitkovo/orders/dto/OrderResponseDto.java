package ua.kvitkovo.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.kvitkovo.users.entity.User;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author Andriy Gaponov
 */
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private Long id;
    private Date created;
    private Date updated;
    private User user;
    private String address;
    private Boolean addPostcard;
    private String postcardText;
    private BigDecimal totalSum;
    private String comment;
}
