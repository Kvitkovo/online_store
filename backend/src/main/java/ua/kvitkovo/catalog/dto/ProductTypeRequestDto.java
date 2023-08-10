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
public class ProductTypeRequestDto {

    private String name;
}
