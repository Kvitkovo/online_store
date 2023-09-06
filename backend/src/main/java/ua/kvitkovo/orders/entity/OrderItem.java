package ua.kvitkovo.orders.entity;

import jakarta.persistence.*;
import lombok.*;
import ua.kvitkovo.catalog.entity.Product;

import java.math.BigDecimal;
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
@Table(name = "order_details")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "product_title", nullable = false)
    private String productTitle;

    @Column(name = "product_price")
    private BigDecimal price;

    @Column(name = "product_qty")
    private BigDecimal qty;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "orderItem")
    private Set<OrderItemComposition> orderItemsCompositions;
}
