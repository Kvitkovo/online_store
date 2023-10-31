package ua.kvitkovo.images.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ua.kvitkovo.aws.AwsService;
import ua.kvitkovo.catalog.converter.ProductDtoMapper;
import ua.kvitkovo.catalog.dto.response.ProductResponseDto;
import ua.kvitkovo.catalog.entity.Product;
import ua.kvitkovo.catalog.repository.ProductRepository;
import ua.kvitkovo.errorhandling.ItemNotCreatedException;
import ua.kvitkovo.errorhandling.ItemNotFoundException;
import ua.kvitkovo.images.converter.ImageDtoMapper;
import ua.kvitkovo.images.converter.ImageResizer;
import ua.kvitkovo.images.converter.WebpHandler;
import ua.kvitkovo.images.dto.ImageRequestDto;
import ua.kvitkovo.images.dto.ImageResponseDto;
import ua.kvitkovo.images.entity.Image;
import ua.kvitkovo.images.repository.ImageRepository;
import ua.kvitkovo.orders.repository.OrderRepository;
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
    private final ProductRepository productRepository;
    private final AwsService awsService;
    private final OrderService orderService;
    private final ImageDtoMapper imageMapper;
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

    public ImageResponseDto findById(long id) throws ItemNotFoundException {
        return imageRepository.findById(id)
                .map(imageMapper::mapEntityToDto)
                .orElseThrow(() -> {
                    throw new ItemNotFoundException("Image not found");
                });
    }

    public List<ImageResponseDto> getImagesByProductId(long productId) {
        List<Image> images = imageRepository.findAllByProductIdOrderByMainImageDesc(productId);
        if (images.isEmpty()) {
            throw new ItemNotFoundException("Images not found");
        }
        return imageMapper.mapEntityToDto(images);
    }

    public ImageResponseDto addImageToProduct(ImageRequestDto dto) {
        ProductResponseDto productResponseDto = productRepository.findById(dto.getProductId())
            .map(product -> productMapper.mapEntityToDto(product, orderService))
                .orElseThrow(() -> new ItemNotFoundException("Product not found"));

        ImageResponseDto imageResponseDto = null;
        try {
            Image image = imageMapper.mapDtoRequestToDto(dto);
            image.setProduct(productMapper.mapDtoToEntity(productResponseDto));
            image.setName(image.getProduct().getTitle() + " image");
            image.setUrl(resizeAndSendImage(dto, bigImageWidth, bigImageHeight, "b"));
            image.setUrlSmall(resizeAndSendImage(dto, smallImageWidth, smallImageHeight, "s"));
            image.setId(null);
            Image savedImage = imageRepository.save(image);

            imageResponseDto = imageMapper.mapEntityToDto(savedImage);

            List<ImageResponseDto> images = getImagesByProductId(productResponseDto.getId());
            if (images.size() == 1) {
                setMainImage(imageResponseDto.getId());
            }

        } catch (IOException e) {
            throw new ItemNotCreatedException("Failed add image");
        }
        return imageResponseDto;
    }

    public void deleteImageById(long imageId) {
        Image image = imageRepository.findById(imageId).orElseThrow(() -> {
            throw new ItemNotFoundException("Image not found");
        });

        awsService.deleteFile(catalogName, getFileNameAws(image.getUrl()));
        awsService.deleteFile(catalogName, getFileNameAws(image.getUrlSmall()));

        imageRepository.delete(image);

        if (image.isMainImage()) {
            setFirstImageAsMain(image.getProduct().getId());
        }
    }

    public void deleteImagesByProductId(long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ItemNotFoundException("Product not found"));

        List<ImageResponseDto> images = product.getImages()
                .stream()
                .map(imageMapper::mapEntityToDto)
                .toList();
        for (ImageResponseDto image : images) {
            deleteImageById(image.getId());
        }
    }

    public ImageResponseDto setMainImage(Long imageId) {
        Image image = imageRepository.findById(imageId).orElseThrow(() -> {
            throw new ItemNotFoundException("Image not found");
        });

        List<Image> allProductImages = image.getProduct().getImages().stream().toList();
        for (Image productImage : allProductImages) {
            productImage.setMainImage(Objects.equals(productImage.getId(), imageId));
            imageRepository.save(productImage);
        }

        image.setMainImage(true);
        return imageMapper.mapEntityToDto(image);
    }

    private void setFirstImageAsMain(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ItemNotFoundException("Product not found"));

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

    private String getFileNameAws(String urlString) {
        String[] strings = urlString.split("/");
        if (strings.length == 6) {
            return strings[5];
        }
        return "";
    }
}
