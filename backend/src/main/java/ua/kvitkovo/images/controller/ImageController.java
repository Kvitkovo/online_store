package ua.kvitkovo.images.controller;

import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.security.access.annotation.Secured;
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
@RequestMapping(value = "/v1/products/images")
public class ImageController {

    private final ImageService imageService;

    @Operation(summary = "Get Image by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OK", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ImageResponseDto.class))
        }),
        @ApiResponse(responseCode = "400", description = "Image not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @GetMapping("/{id}")
    @ResponseBody
    public ImageResponseDto getImageById(@PathVariable Long id) {
        log.info("Received request to get the Image with id - {}.", id);
        ImageResponseDto imageResponseDto = imageService.findById(id);
        log.info("the Image with id - {} was retrieved - {}.", id, imageResponseDto);
        return imageResponseDto;
    }

    @Operation(summary = "Get Images by Product ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OK", content = {
            @Content(
                mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = ImageResponseDto.class))
            )
        }),
        @ApiResponse(responseCode = "400", description = "Image or Product not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @GetMapping(path = "/all/{id}")
    @ResponseBody
    public List<ImageResponseDto> getAllImagesByProductId(@PathVariable Long id) {
        return imageService.getImagesByProductId(id);
    }

    @Operation(summary = "Add a new Image")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OK", content = {
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
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseBody
    public ImageResponseDto addImage(
        @RequestParam("id") long id,
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
        @ApiResponse(responseCode = "200", description = "OK"),
        @ApiResponse(responseCode = "400", description = "Image not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        }),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        log.info("Received request to delete Image with id - {}.", id);
        imageService.deleteImageById(id);
        log.info("the Image with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @Operation(summary = "Delete Images by Product ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OK"),
        @ApiResponse(responseCode = "400", description = "Image not found", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        }),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @DeleteMapping("/all/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteImagesByProductId(@PathVariable Long id) {
        log.info("Received request to delete Image with id - {}.", id);
        imageService.deleteImagesByProductId(id);
        log.info("the Image with id - {} was deleted.", id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Set main image by Image ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OK", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ImageResponseDto.class))
        }),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = {
            @Content(mediaType = "application/json", schema =
            @Schema(implementation = ErrorResponse.class))
        })
    })
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @PutMapping("/main/{id}")
    @ResponseBody
    public ImageResponseDto setMainImage(@PathVariable Long id) {
        log.info("Received request to set main Image with id {}.", id);
        return imageService.setMainImage(id);
    }
}
