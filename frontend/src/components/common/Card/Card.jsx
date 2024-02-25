import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Card.module.scss';
import IconButton from '../../ui-kit/components/IconButton';
import { ICONS } from '../../ui-kit/icons';
import Discount from '../../ui-kit/components/Discount';
import DiscountPrice from '../../ui-kit/components/DiscountPrice';
import { inActive } from '../../../utils/ClassActiveAndInactive';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../../redux/slices/cartSlice';
import { isItemInCart } from '../../../utils/isItemInCart';

const Card = React.memo((props) => {
  const {
    id,
    image,
    available,
    price,
    oldPrice,
    title,
    discount,
    allowAddToConstructor,
  } = props;
  const { cartItems, bouquetItems } = useSelector(
    (state) => state.cartSliceReducer,
  );
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);
  const [inBouquet, setInBouquet] = useState(false);

  const handleCardClick = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToStack = useCallback(
    (props, type) => {
      dispatch(
        addToCart({
          info: {
            image: image,
            title: title,
            discount: discount,
            price: oldPrice,
            priceWithDiscount: price,
            id: id,
          },
          type: type,
        }),
      );
    },
    [discount, dispatch, id, image, oldPrice, price, title],
  );

  const handleDeleteFromStack = useCallback(
    (props, type) => {
      dispatch(removeFromCart({ info: props, type: type }));
    },
    [dispatch],
  );
  useEffect(() => {
    setInCart(false);
    if (isItemInCart(cartItems, id)) {
      setInCart(true);
    }
  }, [cartItems, id]);

  useEffect(() => {
    setInBouquet(false);
    if (isItemInCart(bouquetItems, props.id)) {
      setInBouquet(true);
    }
  }, [bouquetItems, props]);

  return (
    <li className={styles.card} key={id}>
      <Link
        to={`/product/${id}`}
        className={styles.link}
        onClick={handleCardClick}
      >
        <div>
          <img
            src={image}
            alt="букет"
            className={inActive(available, styles.foto, styles.fotoInactive)}
          />
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
      <div className={discount === 0 ? `${styles.hide}` : `${styles.discount}`}>
        {available === 'AVAILABLE' && <Discount discount={discount} />}
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.textFlex}>
          <p className={inActive(available, styles.price, styles.inactive)}>
            Ціна
          </p>
          {available === 'UNAVAILABLE' && (
            <p className={styles.outOfStock}>Немає в наявності</p>
          )}
        </div>
        <div className={styles.cardFlexBottom}>
          <div className={styles.priceWrapper}>
            <DiscountPrice
              oldPrice={oldPrice}
              actualPrice={price}
              isActive={available}
              isSmallCard={true}
            />
          </div>
          <div className={styles.cardFlexBottom}>
            <div
              className={
                available === 'UNAVAILABLE'
                  ? `${styles.hide}`
                  : `${styles.icons}`
              }
            >
              {allowAddToConstructor &&
                (inBouquet ? (
                  <IconButton
                    icon={<ICONS.inBouquet />}
                    onClick={() => handleDeleteFromStack(props, 'bouquet')}
                  />
                ) : (
                  <IconButton
                    icon={<ICONS.BouquetIcon />}
                    onClick={() => handleAddToStack(props, 'bouquet')}
                  />
                ))}
              {!inCart && (
                <IconButton
                  icon={<ICONS.CartIcon />}
                  isBorderYellow={true}
                  onClick={() => handleAddToStack(props, 'cart')}
                  key={'add_to_cart'}
                />
              )}
              {inCart && (
                <IconButton
                  icon={<ICONS.InCartIcon />}
                  isBorderGreen={true}
                  onClick={() => handleDeleteFromStack(props, 'cart')}
                  key={'delete_to_cart'}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
});
export default Card;
