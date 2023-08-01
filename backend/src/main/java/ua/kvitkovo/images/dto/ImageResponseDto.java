package ua.kvitkovo.images.dto;

import lombok.Builder;
import lombok.Data;

/**
 * @author Andriy Gaponov
 */
@Data
@Builder
public class ImageResponseDto {

    private Long id;
    private long productId;
    private String name;
    private boolean mainImage;
    private String url;
    private String urlSmall;
}
