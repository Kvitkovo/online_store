import React from 'react';
import styles from './Discount.module.scss';

const Discount = ({ discount, isBigCard = false }) => {
  return (
    <>
      {isBigCard ? (
        <div className={styles.bigCardDiscount}>-{discount}% знижка</div>
      ) : (
        <div className={styles.discount}>-{discount}%</div>
      )}
    </>
  );
};

export default Discount;
