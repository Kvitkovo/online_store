package ua.kvitkovo.images.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ua.kvitkovo.aws.AwsService;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.images.converter.ImageConverter;
import ua.kvitkovo.images.converter.ImageResizer;
import ua.kvitkovo.images.converter.WebpHandler;
import ua.kvitkovo.images.dto.ImageRequestDto;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;
import ua.kvitkovo.images.repository.ImageRepository;
import ua.kvitkovo.images.validator.ImageDtoValidator;
import ua.kvitkovo.products.dto.ProductResponseDto;
import ua.kvitkovo.products.service.ProductService;
import ua.kvitkovo.utils.ErrorUtils;
import ua.kvitkovo.utils.Helper;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Andriy Gaponov
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ImageService {

    private final ImageRepository imageRepository;
    private final ProductService productService;
    private final AwsService awsService;
    private final ImageConverter imageConverter;
    private final ImageResizer imageResizer;
    private final WebpHandler webpHandler;
    private final ImageDtoValidator imageDtoValidator;
    private final ErrorUtils errorUtils;

    @Value("${aws.s3.catalog.products}")
    private String catalogName;

    public ImageResponseDto findById(long id) throws ItemNotFoundException {
        Optional<Image> optional = imageRepository.findById(id);
        if (optional.isEmpty()) {
            throw new ItemNotFoundException("Image not found");
        }
        return imageConverter.convertToDto(optional.get());
    }

    public List<ImageResponseDto> getImagesByProductId(long productId) {
        List<Image> images = imageRepository.findAllByProductIdOrderByMainImageDesc(productId);
        if (images.isEmpty()) throw new ItemNotFoundException("Images not found");
        return images.stream().map(imageConverter::convertToDto).collect(Collectors.toList());
    }

    public ImageResponseDto addImageToProduct(ImageRequestDto dto) {

        ProductResponseDto productResponseDto = productService.findById(dto.getProductId());

        ImageResponseDto imageResponseDto = null;
        try {
            Image image = imageConverter.convertToEntity(dto);
            image.setName(image.getProduct().getTitle() + " image");
            image.setUrl(resizeAndSendImage(dto, 800, 800, "b"));
            image.setUrlSmall(resizeAndSendImage(dto, 200, 200, "s"));
            Image savedImage = imageRepository.save(image);
            imageResponseDto = imageConverter.convertToDto(savedImage);

            List<ImageResponseDto> images = getImagesByProductId(productResponseDto.getId());
            if (images.size() == 1) {
                setMainImage(imageResponseDto.getId());
            }

        } catch (IOException e) {
            throw new ItemNotCreatedException("Failed add image");
        }
        return findById(imageResponseDto.getId());
    }

    public void deleteImageById(long imageId) {
        ImageResponseDto imageResponseDto = findById(imageId);
        ProductResponseDto productResponseDto = productService.findById(imageResponseDto.getProductId());

        if (imageResponseDto.isMainImage()) {
            setFirstImageAsMain(productResponseDto.getId());
        }

        awsService.deleteFile(catalogName, getFileNameAws(imageResponseDto.getUrl()));
        awsService.deleteFile(catalogName, getFileNameAws(imageResponseDto.getUrlSmall()));

        imageRepository.delete(imageConverter.convertToEntity(imageResponseDto));
    }

    public void deleteImagesByProductId(long productId) {
        ProductResponseDto productResponseDto = productService.findById(productId);

        List<ImageResponseDto> images = getImagesByProductId(productId);
        for (ImageResponseDto image : images) {
            deleteImageById(image.getId());
        }
    }

    public ImageResponseDto setMainImage(Long id) {
        ImageResponseDto imageResponseDto = findById(id);
        ProductResponseDto productResponseDto = productService.findById(imageResponseDto.getProductId());

        List<ImageResponseDto> images = getImagesByProductId(productResponseDto.getId());
        for (ImageResponseDto image : images) {
            image.setMainImage(Objects.equals(image.getId(), id));
            imageRepository.save(imageConverter.convertToEntity(image));
        }
        return findById(id);
    }

    private void setFirstImageAsMain(Long id) {
        ProductResponseDto productResponseDto = productService.findById(id);

        List<ImageResponseDto> images = getImagesByProductId(productResponseDto.getId());
        if (images.size() > 0) {
            ImageResponseDto imageResponseDto = images.get(0);
            imageResponseDto.setMainImage(true);
            imageRepository.save(imageConverter.convertToEntity(imageResponseDto));
        }
    }

    private String resizeAndSendImage(ImageRequestDto dto, int width, int height, String suffix) throws IOException {
        String imageSmallUrl = "";
        File tmpFileSmallImage = File.createTempFile("data", ".jpg");
        String newFileName = generateImageFileName(suffix, dto.getProductId());

        imageResizer.resize(dto.getFile().getInputStream(), tmpFileSmallImage.getAbsoluteFile().toPath(), width, height);
        File fileSmall = webpHandler.convertJpgToWebp(tmpFileSmallImage);

        imageSmallUrl = awsService.sendFile(fileSmall, catalogName, newFileName);

        tmpFileSmallImage.delete();
        fileSmall.delete();

        return imageSmallUrl;
    }

    private String generateImageFileName(String suffix, long productId) {
        StringBuilder sb = new StringBuilder();
        sb.append(productId);
        sb.append("_");
        sb.append(Helper.getRandomString(5));
        sb.append("_");
        sb.append(suffix);
        sb.append(".webp");
        return sb.toString();
    }

    private String getFileNameAws(String urlString) {
        String[] strings = urlString.split("/");
        if (strings.length == 6) {
            return strings[5];
        }
        return "";
    }
}
