package ua.kvitkovo.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author Andriy Gaponov
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SizeRequestDto {

    private String name;
    private int min;
    private int max;
}
