import React from 'react';
import styles from './Discount.module.scss';

const Discount = (props) => {
  return <div className={styles.discount}>{props.discount}%</div>;
};

export default Discount;
