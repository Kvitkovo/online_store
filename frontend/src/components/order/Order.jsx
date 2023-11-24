import React from 'react';
import styles from './Order.module.scss';

const Order = () => {
  return (
    <div className={styles.order}>
      <h2 className={styles.title}>Оформлення замовлення</h2>
      <div className={styles.mainGrid}>
        <div className={styles.contactDetails}>
          <h3 className={styles.subtitle}>
            <span>1.</span>Контактні дані
          </h3>
        </div>
        <div className={styles.cart}>
          <h3 className={styles.subtitle}>Інформація про замовлення</h3>
        </div>
      </div>
    </div>
  );
};
export default Order;
