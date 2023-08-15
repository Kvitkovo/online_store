package ua.kvitkovo.catalog.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ua.kvitkovo.images.entity.Image;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

/**
 * @author Andriy Gaponov
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
@EntityListeners(AuditingEntityListener.class)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @CreatedDate
    @Column(name = "created")
    private Date created;

    @LastModifiedDate
    @Column(name = "updated")
    private Date updated;

    @Column(name = "product_title", nullable = false)
    private String title;

    @Column(name = "alias", nullable = false)
    private String alias;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "price_with_discount")
    private BigDecimal priceWithDiscount;

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "meta_description")
    private String metaDescription;

    @Column(name = "meta_keywords")
    private String metaKeywords;

    @Column(name = "description")
    private String description;

    @Column(name = "product_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "product_color")
    private Color color;

    @ManyToOne
    @JoinColumn(name = "product_height")
    private Size size;

    @Column(name = "allow_add_to_constructor")
    private boolean allowAddToConstructor;

    @ManyToOne
    @JoinColumn(name = "product_type")
    private ProductType productType;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product", fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Image> images;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product that = (Product) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
