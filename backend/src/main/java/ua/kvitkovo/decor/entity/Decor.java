package ua.kvitkovo.decor.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ua.kvitkovo.shop.entity.Shop;
import ua.kvitkovo.users.entity.User;

import java.util.Date;

/**
 * @author Andriy Gaponov
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "decor")
@EntityListeners(AuditingEntityListener.class)
public class Decor {

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

    @Column(name = "decor_comment")
    private String comment;

    @Column(name = "decor_status")
    @Enumerated(EnumType.STRING)
    private DecorStatus status;

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

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    @ManyToOne
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;
}
