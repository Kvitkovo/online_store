import React from 'react';
import styles from './OrderItem.module.scss';

const OrderItem = ({ number, code, item, img, itemQuantity, price }) => {
  if (item.includes('Свій букет')) {
    img = '/images/new_bouquet.jpg';
  } else if (!img) img = '/images/no_image.jpg';

  return (
    <div className={styles.gridOrder}>
      <div>{number}</div>
      <div>код {code}</div>
      <div className={styles.imageAndTitle}>
        <img src={img} className={styles.image} />
        {item}
      </div>
      <div>{itemQuantity} шт</div>
      <div>{price} грн</div>
    </div>
  );
};
export default OrderItem;
