package ua.kvitkovo.orders.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.orders.entity.Order;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface OrderRepository extends OrderRepositoryBasic {

    Page<Order> findAllByCustomerId(Pageable pageable, Long id);
}
