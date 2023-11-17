package ua.kvitkovo.images.entity;

import jakarta.persistence.*;
import lombok.*;
import ua.kvitkovo.catalog.entity.Product;

/**
 * @author Andriy Gaponov
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "image_name", nullable = false)
    private String name;

    @Column(name = "main_image")
    private boolean mainImage;

    @Column(name = "image_url", nullable = false)
    private String url;

    @Column(name = "image_url_small", nullable = false)
    private String urlSmall;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
