import React from 'react';
import styles from './ItemImage.module.scss';
import Discount from '../../../../components/ui-kit/components/Discount';
import { inActive } from '../../../../utils/ClassActiveAndInactive';
const ItemImage = (props) => {
  return (
    <div>
      <div className={styles.itemImage}>
        <div
          className={
            props.discount === 0 ? `${styles.hide}` : `${styles.discount}`
          }
        >
          <Discount discount={props.discount} isBigCard={props.isBigCard} />
        </div>
        <img
          src={props.image}
          alt="букет"
          className={inActive(props.status, styles.foto, styles.fotoInactive)}
        />
      </div>
    </div>
  );
};
export default ItemImage;
