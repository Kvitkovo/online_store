import React from 'react';
import styles from './TotalItems.module.scss';

const TotalItems = React.memo(({ productQuantity, type = 'cart' }) => {
  const countToString = productQuantity.toString();
  const truncatedAndReplacedText =
    productQuantity !== 0
      ? countToString.slice(0, 3) + (countToString.length > 3 ? '...' : '')
      : '';
  return (
    <div>
      {truncatedAndReplacedText !== '' ? (
        <div
          className={`${styles.cartQuantity} ${
            type === 'Bouquet' ? styles.totalBouquet : ''
          }`}
        >
          {truncatedAndReplacedText}
        </div>
      ) : (
        <div className={styles.cartQuantityHide} />
      )}
    </div>
  );
});

export default TotalItems;
