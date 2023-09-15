import React from 'react';
import styles from './DiscountPrice.module.scss';

const DiscountPrice = ({ discount, oldPrice, actualPrice }) => {
  return (
    <div>
      <div
        className={
          styles['old-price'] + ' ' + `${discount === 0 ? styles.hide : ''}`
        }
      >
        {oldPrice} грн
      </div>
      <div className={styles['actual-price']}>
        {actualPrice}
        <span className={styles.currency}>грн</span>
      </div>
    </div>
  );
};

export default DiscountPrice;
