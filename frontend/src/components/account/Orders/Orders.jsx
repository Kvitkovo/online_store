import React from 'react';
import styles from './Orders.module.scss';
import Account from '../Account';

const Orders = () => {
  return (
    <Account title="Вітаємо, Олена">
      <div className={styles.orders}>
        <h2 className={styles.title}> Мої замовлення</h2>
        <div className={styles.gridTable}>
          <div>Номер</div>
          <div>Дата</div>
          <div>Отримувач</div>
          <div>Сума</div>
          <div>Статус</div>
          <div></div>
        </div>
        <div className={styles.noOrders}>
          <p>У вас поки що немає замовлень.</p>
          <img src="/images/no_orders.jpg" alt="" />
        </div>
      </div>
    </Account>
  );
};

export default Orders;
