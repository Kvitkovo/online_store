import React, { useEffect, useState } from 'react';
import styles from './ItemCard.module.scss';
import Path from '../../components/Path';
import ItemImage from '../ItemImage';
import ItemFeatures from '../ItemFeatures/ItemFeatures';
import ItemDescription from '../ItemDescription';
import PriceAndButtons from '../PriceAndButtons/PriceAndButtons';
import Stock from '../Stock';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../redux/slices/cartSlice';
import { isItemInCart } from '../../../../utils/isItemInCart';
import RecentlyViewed from '../../../../components/common/RecentlyViewed';

const ItemCard = ({ cardData }) => {
  const cartItems = useSelector((state) => state.cartSliceReducer.cartItems);
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(false);
    if (isItemInCart(cartItems, cardData.id)) {
      setInCart(true);
    }
  }, [cartItems, cardData]);

  const handleAddToCart = (image, title, discount, oldPrice, price, id) => {
    dispatch(addToCart({ image, title, discount, oldPrice, price, id }));
  };

  return (
    <div className={styles.mainContainer}>
      <Path currentPageData={cardData} currentPageType={'product'} />
      <div className={styles.itemBlock}>
        <div className={styles.caption}>
          <h1 className={styles.itemName}>{cardData.title}</h1>
        </div>
        <div className={styles.cardImage}>
          <ItemImage
            image={
              cardData.images?.length > 0
                ? cardData.images[0].url
                : '/images/no_image.jpg'
            }
            isAvailable={cardData?.available}
            discount={cardData.discount}
            isBigCard={true}
          />
        </div>

        <div className={styles.stock}>
          <Stock stockInfo={cardData?.available} />
        </div>

        <div className={styles.price}>
          <PriceAndButtons
            oldPrice={cardData.price}
            actualPrice={cardData.priceWithDiscount}
            stockInfo={cardData?.available}
            addToConstructor={cardData.allowAddToConstructor}
            addToCart={() =>
              handleAddToCart(
                cardData.images[0]
                  ? cardData.images[0].url
                  : './images/no_image.jpg',
                cardData.title,
                cardData.discount,
                cardData.price,
                cardData.priceWithDiscount,
                cardData.id,
              )
            }
            inCart={inCart}
          />
        </div>
        <div className={styles.features}>
          <ItemFeatures
            type={cardData?.productTypeName}
            color={cardData?.colorName}
            size={cardData?.sizeName}
          />
        </div>
        <div className={styles.description}>
          <ItemDescription description={cardData?.description} />
        </div>
      </div>
      <RecentlyViewed />
    </div>
  );
};
export default ItemCard;
