package ua.kvitkovo.catalog.entity;

import jakarta.persistence.*;
import lombok.*;

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
@EqualsAndHashCode(of = {"id"})
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "category_name", nullable = false)
    private String name;

    @Column(name = "alias", nullable = false)
    private String alias;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Category parent;

    @Column(name = "meta_description")
    private String metaDescription;

    @Column(name = "meta_keywords")
    private String metaKeywords;

    @Column(name = "description")
    private String description;

    @Column(name = "category_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private CategoryStatus status;

    @Column(name = "category_icon", nullable = false)
    @Enumerated(EnumType.STRING)
    private CategoryIcon icon;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;

    @OneToMany(mappedBy = "parent")
    private Set<Category> children;

    @Column(name = "sort_order")
    private int sortValue;
}
