import React from 'react';
import styles from './ItemCard.module.scss';
import { ICONS } from '../../../../components/ui-kit/icons';
import Wrapper from '../../../../components/Wrapper';
import IconButton from '../../../../components/ui-kit/components/IconButton';
import Path from '../../components/Path';
import ItemImage from '../ItemImage';
import ItemFeatures from '../ItemFeatures/ItemFeatures';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import ItemDescription from '../ItemDescription';
import PriceAndButtons from '../PriceAndButtons/PriceAndButtons';
import Stock from '../Stock';
import Slider from '../Slider';

const ItemCard = ({ cardData }) => {
  //console.log('cardData:', cardData);
  const { width } = useWindowSize();
  const windowWidth = width;
  const isDesktop = windowWidth > 1023;
  const isTablet = windowWidth < 1023;
  const isMobile = windowWidth < 767;

  const size = cardData.size?.name;

  return (
    <div>
      <Wrapper>
        <div className={styles.mainContainer}>
          <Path />
          <div className={styles.itemContainer}>
            <div className={styles.itemBlock}>
              <ItemImage
                image={
                  cardData.images[0]
                    ? cardData.images[0].url
                    : './images/no_image.jpg'
                }
                discount={cardData.discount}
                isBigCard={true}
              />
              <div className={styles.itemDescriptionContainer}>
                <h1 className={styles.itemName}>{cardData.title}</h1>
                <Stock isInStock={true} />
                {isDesktop && (
                  <ItemDescription description={cardData.metaDescription} />
                )}
                <ItemFeatures
                  type={cardData.category.name}
                  color={cardData.color.name}
                  size={size}
                />
                <PriceAndButtons
                  oldPrice={cardData.price}
                  actualPrice={cardData.priceWithDiscount}
                />
              </div>
            </div>
            {isTablet && (
              <ItemDescription description={cardData.metaDescription} />
            )}
            <div className={styles.helpButton}>
              <IconButton
                icon={<ICONS.QuestionIcon />}
                isBackground={true}
                isRound={true}
              />
            </div>
          </div>
          {isMobile && (
            <div className={styles.mobileItemCard}>
              <h1 className={styles.itemName}>{cardData.title}</h1>
              <Stock isInStock={true} />
              <ItemImage
                image={
                  cardData.images[0]
                    ? cardData.images[0].url
                    : './images/no_image.jpg'
                }
                discount={cardData.discount}
                isBigCard={true}
              />
              <PriceAndButtons
                price={cardData.price}
                oldPrice={cardData.oldPrice}
              />
              <ItemFeatures
                type={cardData.category.name}
                color={cardData.color.name}
                size={size}
              />
              <ItemDescription description={cardData.metaDescription} />
            </div>
          )}
          <div className={styles.helpButton}>
            <IconButton
              icon={<ICONS.QuestionIcon />}
              isBackground={true}
              isRound={true}
            />
          </div>
          <h2 className={styles.previous}>Раніше переглянуті</h2>
        </div>{' '}
      </Wrapper>
      <Slider />
    </div>
  );
};
export default ItemCard;
