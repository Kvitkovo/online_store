package ua.kvitkovo.errorhandling;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Andriy Gaponov
 */
@Getter
@Setter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    @Schema(example = "Error message", description = "Опис помилки")
    private String message;
    @Schema(example = "1691750778972", description = "Час помилки в мілісекундах")
    private long timestamp;
}
