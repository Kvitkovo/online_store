package ua.kvitkovo.catalog.entity;

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
@Table(name = "colors")
public class Color {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "color_name", nullable = false)
    private String name;

    @Column(name = "alias", nullable = false)
    private String alias;
}
