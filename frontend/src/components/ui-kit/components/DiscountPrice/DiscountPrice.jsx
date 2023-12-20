import React from 'react';
import styles from './DiscountPrice.module.scss';
import { inActive } from '../../../../utils/ClassActiveAndInactive';

const DiscountPrice = ({ oldPrice, actualPrice, isActive, isSmallCard }) => {
  return (
    <>
      <p
        className={
          inActive(isActive, styles.oldPrice, styles.hide) +
          ' ' +
          `${oldPrice === actualPrice ? styles.hide : ''}  ${
            isSmallCard ? styles.oldPriceSmall : ''
          }`
        }
      >
        {oldPrice} грн
      </p>
      <p
        className={
          inActive(isActive, styles.actualPrice, styles.inactive) +
          ' ' +
          `${isSmallCard ? styles.actualPriceSmall : ''}`
        }
      >
        {actualPrice}
        <span className={styles.currency}>грн</span>
      </p>
    </>
  );
};

export default DiscountPrice;
