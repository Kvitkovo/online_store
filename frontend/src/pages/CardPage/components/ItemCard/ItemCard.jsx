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

const ItemCard = () => {
  const { width } = useWindowSize();
  const windowWidth = width;
  const isDesktop = windowWidth > 1190;
  const isTablet = windowWidth < 1190;
  const isMobile = windowWidth < 860;

  return (
    <div>
      <Wrapper>
        <div className={styles.mainContainer}>
          <Path />
          <div className={styles.itemContainer}>
            <div className={styles.itemBlock}>
              <ItemImage
                image="./images/itemCard.jpg"
                discount={15}
                isBigCard={true}
              />
              <div className={styles.itemDescriptionContainer}>
                <h1 className={styles.itemName}>{'Букет "101 троянда"'}</h1>
                <Stock isInStock={true} />
                {isDesktop && <ItemDescription />}
                <ItemFeatures />
                <PriceAndButtons />
              </div>
            </div>
            {isTablet && <ItemDescription />}
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
              <h1 className={styles.itemName}>
                Букет &rdquo;101&rdquo; троянда
              </h1>
              <Stock isInStock={true} />
              <ItemImage
                image="./images/itemCard.jpg"
                discount={15}
                isBigCard={true}
              />
              <PriceAndButtons />
              <ItemFeatures />
              <ItemDescription />
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
