package ua.kvitkovo.orders.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ua.kvitkovo.orders.entity.Order;

/**
 * @author Andriy Gaponov
 */
public interface OrderRepositoryBasic extends JpaRepository<Order, Long>, JpaSpecificationExecutor {

}
