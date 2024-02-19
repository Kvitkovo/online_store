import React, { useCallback, useEffect, useState } from 'react';
import styles from './ItemCard.module.scss';
import Path from '../../components/Path';
import ItemImage from '../ItemImage';
import ItemFeatures from '../ItemFeatures';
import ItemDescription from '../ItemDescription';
import PriceAndButtons from '../PriceAndButtons/PriceAndButtons';
import Stock from '../Stock';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../../redux/slices/cartSlice';
import { isItemInCart } from '../../../../utils/isItemInCart';
import RecentlyViewed from '../../../../components/common/RecentlyViewed';

const ItemCard = ({ cardData }) => {
  const {
    images,
    title,
    discount,
    available,
    productTypeName,
    colorName,
    id,
    sizeName,
    description,
    price,
    priceWithDiscount,
    allowAddToConstructor,
  } = cardData;
  const { cartItems, bouquetItems } = useSelector(
    (state) => state.cartSliceReducer,
  );
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);
  const [inBouquet, setInBouquet] = useState(false);

  useEffect(() => {
    setInCart(false);
    if (isItemInCart(cartItems, id)) {
      setInCart(true);
    }
  }, [cartItems, id]);
  useEffect(() => {
    setInBouquet(false);
    if (isItemInCart(bouquetItems, id)) {
      setInBouquet(true);
    }
  }, [bouquetItems, id]);

  const handleAddToStack = useCallback(
    (type) => {
      dispatch(
        addToCart({
          info: {
            image: images[0] ? images[0].url : '/images/no_image.jpg',
            title: title,
            discount: discount,
            price: price,
            priceWithDiscount: priceWithDiscount,
            id: id,
          },
          type: type,
        }),
      );
    },
    [dispatch, images, title, discount, price, priceWithDiscount, id],
  );
  const handleDeleteFromStack = useCallback(
    (type) => {
      dispatch(removeFromCart({ info: { id: id }, type: type }));
    },
    [dispatch, id],
  );

  return (
    <div className={styles.mainContainer}>
      <Path currentPageData={cardData} currentPageType={'product'} />
      <div className={styles.itemBlock}>
        <div className={styles.caption}>
          <h1 className={styles.itemName}>{title}</h1>
        </div>
        <div className={styles.cardImage}>
          <ItemImage
            image={images?.length > 0 ? images[0].url : '/images/no_image.jpg'}
            isAvailable={available}
            discount={discount}
            isBigCard={true}
          />
        </div>

        <div className={styles.stock}>
          <Stock stockInfo={available} />
        </div>

        <div className={styles.price}>
          <PriceAndButtons
            oldPrice={price}
            actualPrice={priceWithDiscount}
            stockInfo={available}
            canUseInBouquet={allowAddToConstructor}
            addToStack={handleAddToStack}
            deleteFromStack={handleDeleteFromStack}
            inCart={inCart}
            inBouquet={inBouquet}
          />
        </div>
        <div className={styles.features}>
          <ItemFeatures
            type={productTypeName}
            color={colorName}
            size={sizeName}
          />
        </div>
        <div className={styles.description}>
          <ItemDescription description={description} />
        </div>
      </div>
      <RecentlyViewed />
    </div>
  );
};
export default ItemCard;
