import React from 'react';
import styles from './MyBouquetEmpty.module.scss';
import { ICONS } from '../../../../ui-kit/icons';

const MyBouquetEmpty = () => {
  return (
    <div className={styles.root}>
      <div className={styles.block}>
        <div className={styles.centered}>
          <ICONS.myBouquetEmpty />
          <p>До букету поки що не додано компонентів.</p>
        </div>
      </div>
    </div>
  );
};

export default MyBouquetEmpty;
