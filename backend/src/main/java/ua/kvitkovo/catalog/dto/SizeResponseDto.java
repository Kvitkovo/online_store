package ua.kvitkovo.catalog.dto;

import lombok.Builder;
import lombok.Data;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class SizeResponseDto {


    private Long id;
    private String name;
    private String alias;
    private int min;
    private int max;
}
