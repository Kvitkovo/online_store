import React from 'react';
import styles from './Stock.module.scss';

const Stock = ({ stockInfo }) => {
  const isInStock = stockInfo > 0;
  return (
    <div>
      <p
        className={`${styles.Stock} ${
          isInStock ? styles.isInStock : styles.outOfStock
        }`}
      >
        {isInStock ? 'Є в наявності' : 'Товар закінчився'}
      </p>
    </div>
  );
};
export default Stock;
