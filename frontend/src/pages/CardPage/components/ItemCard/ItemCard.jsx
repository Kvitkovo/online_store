import React from 'react';
import styles from './ItemCard.module.scss';
import Path from '../../components/Path';
import ItemImage from '../ItemImage';
import ItemFeatures from '../ItemFeatures/ItemFeatures';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import ItemDescription from '../ItemDescription';
import PriceAndButtons from '../PriceAndButtons/PriceAndButtons';
import Stock from '../Stock';
import Slider from '../Slider';

const ItemCard = ({ cardData }) => {
  const { width } = useWindowSize();
  const windowWidth = width;
  const isDesktop = windowWidth > 1023;
  const isTablet = windowWidth < 1023;
  const isMobile = windowWidth < 767;
  const recentlyViewed = localStorage.getItem('recentlyViewed').split(',');

  return (
    <div className={styles.mainContainer}>
      <div>
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
              />
            </div>
          </div>
          {isTablet && <ItemDescription description={cardData?.description} />}
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
            <PriceAndButtons
              oldPrice={cardData.price}
              actualPrice={cardData.priceWithDiscount}
              stockInfo={cardData?.available}
              addToConstructor={cardData.allowAddToConstructor}
            />
            <ItemFeatures
              type={cardData?.categoryName}
              color={cardData?.colorName}
              size={cardData?.sizeName}
            />
            <ItemDescription description={cardData?.description} />
          </div>
        )}
      </div>
      {recentlyViewed.length > 1 && (
        <>
          <h2 className={styles.previous}>Раніше переглянуті</h2>
          <Slider
            visibleCardAmount={4}
            maxCardAmount={8}
            data={recentlyViewed}
          />
        </>
      )}
    </div>
  );
};
export default ItemCard;
