import React from 'react';
import styles from './ItemFeatures.module.scss';

const ItemFeatures = () => {
  return (
    <div className={styles.features}>
      <p>
        Вид квітів: <span className={styles.type}> Троянди</span>
      </p>
      <p>
        Колір: <span className={styles.type}>Червоний</span>{' '}
      </p>
      <p>
        {' '}
        Висота букета: <span className={styles.type}>55-60см</span>{' '}
      </p>
    </div>
  );
};
export default ItemFeatures;
