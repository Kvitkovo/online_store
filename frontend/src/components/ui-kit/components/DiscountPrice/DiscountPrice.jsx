import React from 'react';
import styles from './DiscountPrice.module.scss';
import { inActive } from '../../../../utils/ClassActiveAndInactive';

const DiscountPrice = ({ oldPrice, actualPrice, isActive }) => {
  return (
    <div>
      <p
        className={
          inActive(isActive, styles.oldPrice, styles.hide) +
          ' ' +
          `${oldPrice === actualPrice ? styles.hide : ''}`
        }
      >
        {oldPrice} грн
      </p>
      <p className={inActive(isActive, styles.actualPrice, styles.inactive)}>
        {actualPrice}
        <span className={styles.currency}>грн</span>
      </p>
    </div>
  );
};

export default DiscountPrice;
