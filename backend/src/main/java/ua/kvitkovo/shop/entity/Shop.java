package ua.kvitkovo.shop.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * @author Andriy Gaponov
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shops")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "alias", nullable = false)
    private String alias;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "address", nullable = false)
    private String address;
}
