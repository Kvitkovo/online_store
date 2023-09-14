import React from 'react';
import styles from './DiscountPrice.module.scss';

const DiscountPrice = ({ oldPrice, actualPrice }) => {
  return (
    <>
      <div className={styles['old-price']}>{oldPrice} грн</div>
      <div className={styles['actual-price']}>
        {actualPrice}
        <span>грн</span>
      </div>
    </>
  );
};

export default DiscountPrice;
