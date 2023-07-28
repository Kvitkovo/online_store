package ua.kvitkovo.products.dto;

import lombok.Builder;
import lombok.Data;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class ColorResponseDto {

    private Long id;
    private String name;
    private String alias;
}
