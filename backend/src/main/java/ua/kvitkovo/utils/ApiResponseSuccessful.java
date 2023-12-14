package ua.kvitkovo.utils;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import ua.kvitkovo.catalog.dto.response.CategoryResponseDto;
import ua.kvitkovo.errorhandling.ErrorResponse;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@ApiResponse(responseCode = "200", description = "Successful operation")
public @interface ApiResponseSuccessful {
}
