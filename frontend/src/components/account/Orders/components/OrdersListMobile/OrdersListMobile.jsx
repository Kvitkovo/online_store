import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OrdersListMobile.module.scss';
import OrderDeleting from '../OrderDeleteIcon/OrderDeleteIcon';
import { statusMapping } from '../../../../../constants/statusMapping';

const OrdersListMobile = ({ data }) => {
  return (
    <div>
      {data.map((order) => (
        <div key={order.id} className={styles.orderList}>
          <div className={styles.blockNumber}>
            <div className={styles.title}>
              <div className={styles.number}>
                <div>Номер</div>
                <div>№ {order.id}</div>
              </div>
              <div className={styles.cancelOrder}>
                <div>Скасувати</div>
                <OrderDeleting orderId={order.id} />
              </div>
            </div>
          </div>
          <div className={styles.dateAndStatus}>
            <div className={styles.date}>
              <div>Дата</div>
              <div>
                {order.dateOfShipment.substring(8, 10) +
                  '.' +
                  order.dateOfShipment.substring(5, 7) +
                  '.' +
                  order.dateOfShipment.substring(0, 4)}
              </div>
            </div>
            <div className={styles.status}>
              <div>Статус</div>
              <div>{statusMapping[order.status]}</div>
            </div>
          </div>
          <div className={styles.totalAmount}>
            <div>Сума</div>
            <div>{order.totalSum} грн</div>
          </div>
          <div className={styles.receiver}>
            <div>Отримувач</div>
            <div>{order.receiverName}</div>
          </div>
          <div className={styles.details}>
            <Link to={`/account/orders/${order.id}`} className={styles.link}>
              Детально
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default OrdersListMobile;
