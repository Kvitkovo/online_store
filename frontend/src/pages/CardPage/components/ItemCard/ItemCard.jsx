import React, { useState } from 'react';
import styles from './ItemCard.module.scss';
import Path from '../../components/Path';
import ItemImage from '../ItemImage';
import ItemFeatures from '../ItemFeatures/ItemFeatures';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import ItemDescription from '../ItemDescription';
import PriceAndButtons from '../PriceAndButtons/PriceAndButtons';
import Stock from '../Stock';
import Slider from '../Slider';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../redux/slices/cartSlice';

const ItemCard = ({ cardData }) => {
  const { width } = useWindowSize();
  const windowWidth = width;
  const isDesktop = windowWidth > 1023;
  const isTablet = windowWidth < 1023;
  const isMobile = windowWidth < 767;

  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);

  const handleAddToCart = ({ image, title, discount, oldPrice, price, id }) => {
    // console.log({ image, title, discount, oldPrice, price, id });
    dispatch(addToCart({ image, title, discount, oldPrice, price, id }));
    setInCart(true);
  };

  return (
    <div>
      <div>
        <div className={styles.mainContainer}>
          <Path />
          <div className={styles.itemContainer}>
            <div className={styles.itemBlock}>
              <ItemImage
                image={
                  cardData.images[0]
                    ? cardData.images[0].url
                    : '/images/no_image.jpg'
                }
                discount={cardData.discount}
                isBigCard={true}
              />
              <div className={styles.itemDescriptionContainer}>
                <h1 className={styles.itemName}>{cardData.title}</h1>
                <Stock stockInfo={cardData?.available} />
                {isDesktop && (
                  <ItemDescription description={cardData?.description} />
                )}
                <ItemFeatures
                  type={cardData?.categoryName}
                  color={cardData?.colorName}
                  size={cardData?.sizeName}
                />
                <PriceAndButtons
                  oldPrice={cardData.price}
                  actualPrice={cardData.priceWithDiscount}
                  stockInfo={cardData?.available}
                  addToConstructor={cardData.allowAddToConstructor}
                  addToCart={() =>
                    handleAddToCart(
                      cardData.images[0]
                        ? cardData.images[0]
                        : '/images/no_image.jpg',
                      cardData.title,
                      cardData.discount,
                      cardData.oldPrice,
                      cardData.price,
                      cardData.id,
                    )
                  }
                />
              </div>
            </div>
            {isTablet && (
              <ItemDescription description={cardData?.description} />
            )}
          </div>
          {isMobile && (
            <div className={styles.mobileItemCard}>
              <h1 className={styles.itemName}>{cardData.title}</h1>
              <Stock stockInfo={cardData?.available} />
              <ItemImage
                image={
                  cardData.images[0]
                    ? cardData.images[0].url
                    : '/images/no_image.jpg'
                }
                discount={cardData.discount}
                isBigCard={true}
              />
              {!inCart ? (
                <PriceAndButtons
                  oldPrice={cardData.price}
                  actualPrice={cardData.priceWithDiscount}
                  stockInfo={cardData?.available}
                  addToConstructor={cardData.allowAddToConstructor}
                  addToCart={() => handleAddToCart(cardData)}
                />
              ) : null}
              <ItemFeatures
                type={cardData?.categoryName}
                color={cardData?.colorName}
                size={cardData?.sizeName}
              />
              <ItemDescription description={cardData?.description} />
            </div>
          )}
          <h2 className={styles.previous}>Раніше переглянуті</h2>
        </div>
      </div>
      <Slider />
    </div>
  );
};
export default ItemCard;
