package ua.kvitkovo.orders.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ua.kvitkovo.shop.entity.Shop;
import ua.kvitkovo.users.entity.User;

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
@Table(name = "orders")
@EntityListeners(AuditingEntityListener.class)
public class Order {

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User manager;

    @Column(name = "address_text")
    private String address;

    @Column(name = "postcard_text")
    private String postcardText;

    @Column(name = "total_sum")
    private BigDecimal totalSum;

    @Column(name = "order_comment")
    private String comment;

    @Column(name = "order_status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_phone")
    private String customerPhone;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "address_city")
    private String addressCity;

    @Column(name = "address_street")
    private String addressStreet;

    @Column(name = "address_house")
    private String addressHouse;

    @Column(name = "address_apartment")
    private String addressApartment;

    @Column(name = "receiver_name")
    private String receiverName;

    @Column(name = "receiver_phone")
    private String receiverPhone;

    @CreatedDate
    @Column(name = "date_of_shipment")
    private Date dateOfShipment;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    @Column(name = "delivery_type")
    @Enumerated(EnumType.STRING)
    private Delivery delivery;

    @Column(name = "pay_type")
    @Enumerated(EnumType.STRING)
    private Pay pay;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order", orphanRemoval = true)
    private Set<OrderItem> orderItems;
}
