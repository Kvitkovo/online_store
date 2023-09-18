import React from 'react';
import styles from './DiscountPrice.module.scss';
import { Inactive } from '../../../../utils/ClassActiveAndInactive';

const DiscountPrice = ({ oldPrice, actualPrice, isActive }) => {
  return (
    <div>
      <p
        className={
          styles.oldPrice +
          ' ' +
          `${oldPrice === actualPrice ? styles.hide : ''}` +
          ' ' +
          Inactive(isActive, styles.actualPrice, styles.hide)
        }
      >
        {oldPrice} грн
      </p>
      <p className={Inactive(isActive, styles.actualPrice, styles.inactive)}>
        {actualPrice}
        <span className={styles.currency}>грн</span>
      </p>
    </div>
  );
};

export default DiscountPrice;
