import React from 'react';
import styles from './Card.module.scss';
import IconButton from '../../ui-kit/components/IconButton';
import { ICONS } from '../../ui-kit/icons';
import Discount from '../../ui-kit/components/Discount/Discount';
import DiscountPrice from '../../ui-kit/components/DiscountPrice/DiscountPrice';
import { inActive } from '../../../utils/ClassActiveAndInactive';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const handleCardClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <Link to={`/product/${props.id}`} className={styles.link}>
        <img
          src={props.image}
          alt="букет"
          className={inActive(
            props.available,
            styles.foto,
            styles.fotoInactive,
          )}
        />
        <h3>{props.title}</h3>
        <div
          className={
            props.discount === 0 ? `${styles.hide}` : `${styles.discount}`
          }
        >
          {props.available === 'AVAILABLE' && (
            <Discount discount={props.discount} />
          )}
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.textFlex}>
            <p
              className={inActive(
                props.available,
                styles.price,
                styles.inactive,
              )}
            >
              Ціна
            </p>
            {props.available === 'UNAVAILABLE' && (
              <p className={styles.outOfStock}>Немає в наявності</p>
            )}
          </div>
          <div className={styles.cardFlexBottom}>
            <DiscountPrice
              oldPrice={props.oldPrice}
              actualPrice={props.price}
              isActive={props.available}
            />
            <div className={styles.cardFlexBottom}>
              <div
                className={
                  props.available === 'UNAVAILABLE'
                    ? `${styles.hide}`
                    : `${styles.icons}`
                }
              >
                {props.bouquet && <IconButton icon={<ICONS.BouquetIcon />} />}
                <IconButton icon={<ICONS.CartIcon />} isBorderYellow={true} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Card;
