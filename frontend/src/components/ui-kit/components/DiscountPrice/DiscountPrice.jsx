import React from 'react';
import styles from './DiscountPrice.module.scss';

const DiscountPrice = ({ oldPrice, actualPrice }) => {
  return (
    <div>
      <p
        className={
          styles['old-price'] +
          ' ' +
          `${oldPrice === actualPrice ? styles.hide : ''}`
        }
      >
        {oldPrice} грн
      </p>
      <p className={styles['actual-price']}>
        {actualPrice}
        <span className={styles.currency}>грн</span>
      </p>
    </div>
  );
};

export default DiscountPrice;
