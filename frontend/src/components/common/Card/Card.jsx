import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Card.module.scss';
import IconButton from '../../ui-kit/components/IconButton';
import { ICONS } from '../../ui-kit/icons';
import Discount from '../../ui-kit/components/Discount/Discount';
import DiscountPrice from '../../ui-kit/components/DiscountPrice/DiscountPrice';
import { inActive } from '../../../utils/ClassActiveAndInactive';
// import { Link } from 'react-router-dom';
import { addToCart } from '../../../redux/slices/cartSlice';

const Card = (props) => {
  const dispatch = useDispatch();

  // const handleCardClick = () => {
  //   window.scrollTo(0, 0);
  // };

  const handleAddToCart = (props) => {
    dispatch(addToCart(props));
  };

  return (
    <div className={styles.card}>
      {/* <Link to={`/product/${props.id}`} className={styles.link}> */}
      <img
        src={props.image}
        alt="букет"
        className={inActive(props.status, styles.foto, styles.fotoInactive)}
      />
      <h3>{props.title}</h3>
      <div
        className={
          props.discount === 0 ? `${styles.hide}` : `${styles.discount}`
        }
      >
        <Discount discount={props.discount} />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.textFlex}>
          <p className={inActive(props.status, styles.price, styles.inactive)}>
            Ціна
          </p>
          {props.status === 'NO_ACTIVE' && (
            <p className={styles.outOfStock}>Немає в наявності</p>
          )}
        </div>
        <div className={styles.cardFlexBottom}>
          <DiscountPrice
            oldPrice={props.oldPrice}
            actualPrice={props.price}
            isActive={props.status}
          />
          <div className={styles.cardFlexBottom}>
            <div
              className={
                props.status === 'NO_ACTIVE'
                  ? `${styles.hide}`
                  : `${styles.icons}`
              }
            >
              {props.bouquet && <IconButton icon={<ICONS.BouquetIcon />} />}
              <IconButton
                icon={<ICONS.CartIcon />}
                isBorderYellow={true}
                onClick={() => handleAddToCart(props)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};
export default Card;
