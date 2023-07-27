package ua.kvitkovo.products.entity;

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
@Table(name = "sizes")
public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "size_name", nullable = false)
    private String name;

    @Column(name = "alias", nullable = false)
    private String alias;

    @Column(name = "size_min", nullable = false)
    private int min;

    @Column(name = "size_max", nullable = false)
    private int max;
}
