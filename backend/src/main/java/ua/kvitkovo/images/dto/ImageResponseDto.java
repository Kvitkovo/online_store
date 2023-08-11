package ua.kvitkovo.images.dto;

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
public class ImageResponseDto {

    private Long id;
    private long productId;
    private String name;
    private boolean mainImage;
    private String url;
    private String urlSmall;
}
