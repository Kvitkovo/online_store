package ua.kvitkovo.orders.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
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
    @JoinColumn(name = "user_id", nullable = false)
    private User manager;

    @Column(name = "address_text")
    private String address;

    @Column(name = "add_postcard")
    private Boolean addPostcard;

    @Column(name = "postcard_text")
    private String postcardText;

    @Column(name = "total_sum")
    private BigDecimal totalSum;

    @Column(name = "order_comment")
    private String comment;

    @Column(name = "order_status")
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

    @Column(name = "date_of_shipment")
    private Date dateOfShipment;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private Set<OrderItem> orderItems;
}
