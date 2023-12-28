package ua.kvitkovo.images.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ua.kvitkovo.aws.AwsService;
import ua.kvitkovo.catalog.converter.ProductDtoMapper;
import ua.kvitkovo.catalog.dto.response.ProductResponseDto;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.catalog.service.ProductService;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.images.converter.ImageResizer;
import ua.kvitkovo.images.converter.WebpHandler;
import ua.kvitkovo.images.dto.ImageRequestDto;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;
import ua.kvitkovo.images.repository.ImageRepository;
import ua.kvitkovo.orders.service.OrderService;
import ua.kvitkovo.utils.Helper;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

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
    private final OrderService orderService;

    private final ProductDtoMapper productMapper;
    private final ImageResizer imageResizer;
    private final WebpHandler webpHandler;

    @Value("${aws.s3.catalog.products}")
    private String catalogName;

    @Value("${image.small.size.width}")
    private int smallImageWidth;
    @Value("${image.small.size.width}")
    private int smallImageHeight;
    @Value("${image.big.size.width}")
    private int bigImageWidth;
    @Value("${image.big.size.height}")
    private int bigImageHeight;

    public Image findById(long id) throws ItemNotFoundException {
        return imageRepository.findById(id)
            .orElseThrow(() -> {
                throw new ItemNotFoundException("Image not found");
            });
    }

    public List<Image> getImagesByProductId(long productId) {
        List<Image> images = imageRepository.findAllByProductIdOrderByMainImageDesc(productId);
        if (images.isEmpty()) {
            throw new ItemNotFoundException("Images not found");
        }
        return images;
    }

    public Image addImageToProduct(ImageRequestDto dto) {
        Product product = productService.findById(dto.getProductId());
        Image image = new Image();
        try {
            image.setProduct(product);
            image.setName(image.getProduct().getTitle() + " image");
            image.setUrl(resizeAndSendImage(dto, bigImageWidth, bigImageHeight, "b"));
            image.setUrlSmall(resizeAndSendImage(dto, smallImageWidth, smallImageHeight, "s"));
            image.setId(null);
            imageRepository.save(image);

            List<Image> images = getImagesByProductId(product.getId());
            if (images.size() == 1) {
                setMainImage(image.getId());
            }

        } catch (IOException e) {
            throw new ItemNotCreatedException("Failed add image");
        }
        return image;
    }

    public void deleteImageById(long imageId) {
        Image image = findById(imageId);
        awsService.deleteFile(catalogName, awsService.getFileNameAws(image.getUrl()));
        awsService.deleteFile(catalogName, awsService.getFileNameAws(image.getUrlSmall()));
        imageRepository.delete(image);
        if (image.isMainImage()) {
            setFirstImageAsMain(image.getProduct().getId());
        }
    }

    public void deleteImagesByProductId(long productId) {
        Product product = productService.findById(productId);
        product.getImages().stream().mapToLong(Image::getId).forEach(this::deleteImageById);
    }

    public Image setMainImage(Long imageId) {
        Image image = findById(imageId);
        List<Image> allProductImages = image.getProduct().getImages().stream().toList();
        for (Image productImage : allProductImages) {
            productImage.setMainImage(Objects.equals(productImage.getId(), imageId));
            imageRepository.save(productImage);
        }
        image.setMainImage(true);
        return image;
    }

    private void setFirstImageAsMain(Long productId) {
        Product product = productService.findById(productId);
        List<Image> allProductImages = product.getImages().stream().toList();
        if (allProductImages.size() > 0) {
            Image firstImage = allProductImages.get(0);
            firstImage.setMainImage(true);
            imageRepository.save(firstImage);
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
}
