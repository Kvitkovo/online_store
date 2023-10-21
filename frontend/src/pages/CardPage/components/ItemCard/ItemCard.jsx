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
import { ICONS } from '../../../../components/ui-kit/icons';
import IconButton from '../../../../components/ui-kit/components/IconButton';

const ItemCard = ({ cardData }) => {
  const { width } = useWindowSize();
  const windowWidth = width;
  const isDesktop = windowWidth > 1023;
  const isTablet = windowWidth < 1023;
  const isMobile = windowWidth < 767;

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
              <PriceAndButtons
                oldPrice={cardData.price}
                actualPrice={cardData.priceWithDiscount}
                stockInfo={cardData?.available}
              />
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
