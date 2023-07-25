package ua.kvitkovo.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.kvitkovo.shop.entity.Shop;

/**
 * @author Andriy Gaponov
 */
public interface ShopRepositoryBasic extends JpaRepository<Shop, Long> {
}
