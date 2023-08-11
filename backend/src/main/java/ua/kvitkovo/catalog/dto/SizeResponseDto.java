package ua.kvitkovo.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SizeResponseDto {


    private Long id;
    private String name;
    private String alias;
    private int min;
    private int max;
}