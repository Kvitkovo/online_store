import React from 'react';
import styles from './DiscountPrice.module.scss';

const DiscountPrice = ({ oldPrice, actualPrice, isActive }) => {
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
      <p
        className={
          styles['actual-price'] +
          ' ' +
          `${isActive === 'NO_ACTIVE' ? styles.inactive : ''}`
        }
      >
        {actualPrice}
        <span
          className={
            styles.currency +
            ' ' +
            `${isActive === 'NO_ACTIVE' ? styles.inactive : ''}`
          }
        >
          грн
        </span>
      </p>
    </div>
  );
};

export default DiscountPrice;
