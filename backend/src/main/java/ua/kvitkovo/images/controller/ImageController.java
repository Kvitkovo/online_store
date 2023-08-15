package ua.kvitkovo.images.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ua.kvitkovo.errorhandling.ErrorResponse;
import ua.kvitkovo.images.dto.ImageRequestDto;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.service.ImageService;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Product images")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/products")
public class ImageController {

    private final ImageService imageService;

    @Operation(summary = "Get Image by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ImageResponseDto.class))
            }),
            @ApiResponse(responseCode = "404", description = "Image not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/images/{id}")
    @ResponseBody
    public ImageResponseDto getImageById(
            @Parameter(description = "The ID of the image to retrieve", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.info("Received request to get the Image with id - {}.", id);
        ImageResponseDto imageResponseDto = imageService.findById(id);
        log.info("the Image with id - {} was retrieved - {}.", id, imageResponseDto);
        return imageResponseDto;
    }

    @Operation(summary = "Get Images by Product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = ImageResponseDto.class))
                    )
            }),
            @ApiResponse(responseCode = "404", description = "Image or Product not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping(path = "/{id}/images")
    @ResponseBody
    public List<ImageResponseDto> getAllImagesByProductId(
            @Parameter(description = "The ID of the product to retrieve the image for", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        return imageService.getImagesByProductId(id);
    }

    @Operation(summary = "Add a new Image")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ImageResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "The Image has already been added " +
                    "or some data is missing", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @PostMapping(path = "/uploadImage", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseBody
    public ImageResponseDto addImage(
            @Parameter(description = "The ID of the product to retrieve the image for", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @RequestParam("id") long id,
            @Parameter(description = "Image file in jpg format", required = true,
                    schema = @Schema(type = "string", format = "binary")
            )
            @RequestParam("file") MultipartFile file) {
        log.info("Received request to create Image");
        ImageRequestDto imageRequestDto = ImageRequestDto.builder()
                .productId(id)
                .file(file)
                .build();

        ImageResponseDto imageResponseDto = imageService.addImageToProduct(imageRequestDto);
        return imageResponseDto;
    }

    @Operation(summary = "Delete Image by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "404", description = "Image not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @DeleteMapping("/images/{id}/deleteImage")
    @ResponseBody
    public ResponseEntity<Void> deleteImage(
            @Parameter(description = "The ID of the image to be deleted", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.info("Received request to delete Image with id - {}.", id);
        imageService.deleteImageById(id);
        log.info("the Image with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Delete Images by Product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "Image not found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @DeleteMapping("/{id}/images/deleteAllImages")
    @ResponseBody
    public ResponseEntity<Void> deleteImagesByProductId(
            @Parameter(description = "The ID of the product to delete the image for", required = true,
                    schema = @Schema(type = "integer", format = "int64")
            )
            @PathVariable Long id) {
        log.info("Received request to delete Image with id - {}.", id);
        imageService.deleteImagesByProductId(id);
        log.info("the Image with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Set main image by Image ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ImageResponseDto.class))
            }),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ErrorResponse.class))
            })
    })
    @PutMapping("/{id}/images/setMain")
    @ResponseBody
    public ImageResponseDto setMainImage(@PathVariable Long id) {
        log.info("Received request to set main Image with id {}.", id);
        return imageService.setMainImage(id);
    }
}
