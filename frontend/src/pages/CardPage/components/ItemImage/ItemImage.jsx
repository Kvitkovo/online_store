import React from 'react';
import styles from './ItemImage.module.scss';
import Discount from '../../../../components/ui-kit/components/Discount';
import { inActive } from '../../../../utils/ClassActiveAndInactive';
const ItemImage = ({ isAvailable, discount, isBigCard, image }) => {
  const isUnavailable = isAvailable === 'UNAVAILABLE';
  return (
    <>
      <div className={styles.itemImage}>
        <div
          className={
            discount === 0 || isUnavailable
              ? `${styles.hide}`
              : `${styles.discount}`
          }
        >
          <Discount discount={discount} isBigCard={isBigCard} />
        </div>
        <img
          src={image}
          alt="букет"
          className={inActive(isAvailable, styles.foto, styles.fotoInactive)}
        />
      </div>
    </>
  );
};
export default ItemImage;
