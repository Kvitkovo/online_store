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
@Table(name = "product_types")
public class ProductType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "product_type_name", nullable = false)
    private String name;

    @Column(name = "alias", nullable = false)
    private String alias;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "productType")
    private Set<Product> products;
}
