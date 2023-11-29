import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Card.module.scss';
import IconButton from '../../ui-kit/components/IconButton';
import { ICONS } from '../../ui-kit/icons';
import Discount from '../../ui-kit/components/Discount/Discount';
import DiscountPrice from '../../ui-kit/components/DiscountPrice/DiscountPrice';
import { inActive } from '../../../utils/ClassActiveAndInactive';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../redux/slices/cartSlice';

const Card = (props) => {
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);

  const handleCardClick = () => {
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (props) => {
    dispatch(addToCart(props));
    setInCart(true);
  };

  return (
    <div className={styles.card}>
      <Link
        to={`/product/${props.id}`}
        className={styles.link}
        onClick={handleCardClick}
      >
        <div>
          <img
            src={props.image}
            alt="букет"
            className={inActive(
              props.available,
              styles.foto,
              styles.fotoInactive,
            )}
          />
          <h3 className={styles.title}>{props.title}</h3>
        </div>
      </Link>
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
            className={inActive(props.available, styles.price, styles.inactive)}
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
              {!inCart && (
                <IconButton
                  icon={<ICONS.CartIcon />}
                  isBorderYellow={true}
                  onClick={() => handleAddToCart(props)}
                />
              )}
              {inCart && (
                <IconButton icon={<ICONS.InCartIcon />} isBorderGreen={true} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
