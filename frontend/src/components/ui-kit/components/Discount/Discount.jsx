import React from 'react';
import styles from './Discount.module.scss';

const Discount = (props) => {
  return (
    <div>
      {props.isSmallCard ? (
        <div className={styles.discount}>-{props.discount}%</div>
      ) : (
        <div className={styles.bigCardDiscount}>-{props.discount}% знижка</div>
      )}
    </div>
  );
};

export default Discount;
