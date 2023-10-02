import React from 'react';
import styles from './Stock.module.scss';

const Stock = (props) => {
  return (
    <div>
      <p
        className={`${styles.Stock} ${
          props.isInStock ? styles.isInStock : styles.outOfStock
        }`}
      >
        {props.isInStock ? 'Є в наявності' : 'Товар закінчився'}
      </p>
    </div>
  );
};
export default Stock;
