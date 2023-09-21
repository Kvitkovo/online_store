package ua.kvitkovo.users.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * @author Andriy Gaponov
 */
@Entity
@Table(name = "positions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alias", nullable = false)
    private String alias;

    @Column(name = "title", nullable = false)
    private String title;
}
