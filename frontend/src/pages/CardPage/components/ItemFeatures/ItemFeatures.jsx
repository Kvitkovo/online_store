import React from 'react';
import styles from './ItemFeatures.module.scss';

const ItemFeatures = ({ type, color, size }) => {
  return (
    <div className={styles.features}>
      <p>
        Вид квітів: <span className={styles.type}> {type} </span>
      </p>

      <p>
        Колір: <span className={styles.type}> {color} </span>{' '}
      </p>

      {size && (
        <p>
          Висота букета: <span className={styles.type}> {size} </span>{' '}
        </p>
      )}
    </div>
  );
};
export default ItemFeatures;
