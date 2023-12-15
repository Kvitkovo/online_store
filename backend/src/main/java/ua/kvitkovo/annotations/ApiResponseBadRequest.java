package ua.kvitkovo.annotations;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import ua.kvitkovo.errorhandling.ErrorResponse;

@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@ApiResponse(responseCode = "400", description = "Some data is missing", content = {
    @Content(mediaType = "application/json", schema =
    @Schema(implementation = ErrorResponse.class))
})
public @interface ApiResponseBadRequest {

}
