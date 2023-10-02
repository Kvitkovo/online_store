import React from 'react';
import styles from './CartEmpty.module.scss';
import { ICONS } from '../../../../ui-kit/icons';

const CartEmpty = () => {
  return (
    <div className={styles.root}>
      <p>У кошику не має товарів</p>
      <div className={styles.block}>
        <div className={styles.centered}>
          <ICONS.cartEmpty />
          <p>Ваш кошик поки що порожній.</p>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
