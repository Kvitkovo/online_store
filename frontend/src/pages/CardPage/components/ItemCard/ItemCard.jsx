import React, { useEffect, useState } from 'react';
import styles from './ItemCard.module.scss';
import Path from '../../components/Path';
import ItemImage from '../ItemImage';
import ItemFeatures from '../ItemFeatures/ItemFeatures';
import ItemDescription from '../ItemDescription';
import PriceAndButtons from '../PriceAndButtons/PriceAndButtons';
import Stock from '../Stock';
import Slider from '../Slider';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../redux/slices/cartSlice';
import { isItemInCart } from '../../../../utils/isItemInCart';

const ItemCard = ({ cardData }) => {
  const recentlyViewed = Array.from(
    JSON.parse(localStorage.getItem('recentlyViewed') || ''),
  );
  const { cartItems, bouquetItems } = useSelector(
    (state) => state.cartSliceReducer,
  );
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);
  const [inBouquet, setInBouquet] = useState(false);

  useEffect(() => {
    setInCart(false);
    if (isItemInCart(cartItems, cardData.id)) {
      setInCart(true);
    }
  }, [cartItems, cardData]);
  useEffect(() => {
    setInBouquet(false);
    if (isItemInCart(bouquetItems, cardData.id)) {
      setInBouquet(true);
    }
  }, [bouquetItems, cardData]);

  const handleAddToCart = (image, title, discount, oldPrice, price, id) => {
    dispatch(
      addToCart({
        info: { image, title, discount, oldPrice, price, id },
        type: 'cart',
      }),
    );
  };
  const handleAddToBouquet = (image, title, discount, oldPrice, price, id) => {
    dispatch(
      addToCart({
        info: { image, title, discount, oldPrice, price, id },
        type: 'bouquet',
      }),
    );
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
            addToBouquet={() => {
              handleAddToBouquet(
                cardData.images[0]
                  ? cardData.images[0].url
                  : './images/no_image.jpg',
                cardData.title,
                cardData.discount,
                cardData.price,
                cardData.priceWithDiscount,
                cardData.id,
              );
            }}
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
            inBouquet={inBouquet}
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
      {recentlyViewed.length > 1 && (
        <>
          <h2 className={styles.previous}>Раніше переглянуті</h2>
          <Slider data={recentlyViewed} />
        </>
      )}
    </div>
  );
};
export default ItemCard;
