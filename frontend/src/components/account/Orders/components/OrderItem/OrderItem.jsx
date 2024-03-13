import React from 'react';
import styles from './OrderItem.module.scss';

const OrderItem = ({ number, code, item, img, itemQuantity, price }) => {
  return (
    <div className={styles.gridOrder}>
      <div>{number}</div>
      <div>код {code}</div>
      <div className={styles.imageAndTitle}>
        <img src={img} className={styles.image} /> {item}
      </div>
      <div>{itemQuantity} шт</div>
      <div>{price} грн</div>
    </div>
  );
};
export default OrderItem;
