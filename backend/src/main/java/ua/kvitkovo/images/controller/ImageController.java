package ua.kvitkovo.images.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.kvitkovo.images.converter.ImageDtoMapper;
import ua.kvitkovo.images.dto.ImageRequestDto;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;
import ua.kvitkovo.images.service.ImageService;
import ua.kvitkovo.annotations.ApiResponseBadRequest;
import ua.kvitkovo.annotations.ApiResponseForbidden;
import ua.kvitkovo.annotations.ApiResponseNotFound;
import ua.kvitkovo.annotations.ApiResponseSuccessful;
import ua.kvitkovo.annotations.ApiResponseUnauthorized;

@Tag(name = "Product images", description = "the images API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/products")
public class ImageController {

    private final ImageService imageService;
    private final ImageDtoMapper imageMapper;

    @Operation(summary = "Get Image by ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = ImageResponseDto.class))
    })
    @ApiResponseNotFound
    @GetMapping("/images/{id}")
    public ImageResponseDto getImageById(
        @PathVariable Long id) {
        log.debug("Received request to get the Image with id - {}.", id);
        Image image = imageService.findById(id);
        log.debug("the Image with id - {} was retrieved - {}.", id, image);
        return imageMapper.mapEntityToDto(image);
    }

    @Operation(summary = "Get Images by Product ID")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(
            mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = ImageResponseDto.class))
        )
    })
    @ApiResponseNotFound
    @GetMapping(path = "/{id}/images")
    public List<ImageResponseDto> getAllImagesByProductId(
        @PathVariable Long id) {
        List<Image> images = imageService.getImagesByProductId(id);
        return imageMapper.mapEntityToDto(images);
    }

    @Operation(summary = "Add a new Image")

    @ApiResponse(responseCode = "200", description = "Successful operation", content = {
        @Content(mediaType = "application/json", schema =
        @Schema(implementation = ImageResponseDto.class))
    })
    @ApiResponseBadRequest
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PostMapping(path = "/uploadImage", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ImageResponseDto addImage(
        @RequestParam("id") Long id,
        @RequestParam("file") MultipartFile file) {
        log.debug("Received request to create Image");
        ImageRequestDto imageRequestDto = ImageRequestDto.builder()
            .productId(id)
            .file(file)
            .build();

        Image image = imageService.addImageToProduct(imageRequestDto);
        return imageMapper.mapEntityToDto(image);
    }

    @Operation(summary = "Delete Image by ID")
    @ApiResponseSuccessful
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @DeleteMapping("/images/{id}/deleteImage")
    public ResponseEntity<Void> deleteImage(
        @PathVariable Long id) {
        log.debug("Received request to delete Image with id - {}.", id);
        imageService.deleteImageById(id);
        log.debug("the Image with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Delete Images by Product ID")
    @ApiResponseSuccessful
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @DeleteMapping("/{id}/images/deleteAllImages")
    public ResponseEntity<Void> deleteImagesByProductId(
        @PathVariable Long id) {
        log.debug("Received request to delete Image with id - {}.", id);
        imageService.deleteImagesByProductId(id);
        log.debug("the Image with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Set main image by Image ID")
    @ApiResponseSuccessful
    @ApiResponseUnauthorized
    @ApiResponseForbidden
    @ApiResponseNotFound
    @PutMapping("/images/{id}/setMain")
    public ImageResponseDto setMainImage(
        @PathVariable Long id) {
        log.debug("Received request to set main Image with id {}.", id);
        Image image = imageService.setMainImage(id);
        return imageMapper.mapEntityToDto(image);
    }
}
