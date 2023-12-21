package ua.kvitkovo.orders.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.orders.entity.Order;
import ua.kvitkovo.orders.entity.OrderStatus;

import java.util.List;

@Repository
public interface OrderRepository extends OrderRepositoryBasic {

    Page<Order> findAllByCustomerId(Pageable pageable, Long id);

    Page<Order> findAllByCustomerIdAndStatusNotIn(Pageable pageable, Long id, List<OrderStatus> orderStatusList);

    List<Order> findAllByStatusIn(List<OrderStatus> orderStatusList);

    @Query(value = """
                    SELECT IFNULL(SUM((IFNULL(od.product_qty, 0) + IFNULL(pc.product_qty, 0))), 0) qty FROM orders o
                    LEFT JOIN order_details od ON o.id = od.order_id
                    LEFT JOIN product_composition pc ON od.id = pc.order_details_id
                    WHERE o.order_status IN ("ACCEPT", "IS_DELIVERED") AND (od.product_id = ?1 or pc.product_id = ?1)
            """, nativeQuery = true)
    int getProductCountInOrders(Long id);
}
