import React from 'react';
import styles from './OrdersListMobile.module.scss';
import OrderDeleting from '../OrderDeleteIcon/OrderDeleteIcon';

const OrdersListMobile = ({ data }) => {
  return (
    <>
      {data.map((order) => (
        <div key={order.id} className={styles.blockNumber}>
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
      ))}
    </>
  );
};
export default OrdersListMobile;
