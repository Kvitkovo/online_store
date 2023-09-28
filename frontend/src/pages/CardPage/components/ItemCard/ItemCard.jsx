import React from 'react';
import styles from './ItemCard.module.scss';
import { ICONS } from '../../../../components/ui-kit/icons';
import Wrapper from '../../../../components/Wrapper';
import IconButton from '../../../../components/ui-kit/components/IconButton';
/* import Slider from '../CardPage/components/Slider'; */
import Path from '../../components/Path';
import ItemImage from '../ItemImage';
import ItemFeatures from '../ItemFeatures/ItemFeatures';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import ItemDescription from '../ItemDescription';
import PriceAndButtons from '../PriceAndButtons/PriceAndButtons';
import Stock from '../Stock';

const ItemCard = () => {
  const { width } = useWindowSize();
  return (
    <div className={styles.mainPage}>
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
                <h1 className={styles.itemName}>
                  Букет &rdquo;101&rdquo; троянда
                </h1>
                <Stock isInStock={true} />
                {width > 1023 ? <ItemDescription /> : null}
                <ItemFeatures />
                <PriceAndButtons />
              </div>
            </div>
            {width < 1023 ? <ItemDescription /> : null}
            <div className={styles.helpButton}>
              {' '}
              <IconButton
                icon={<ICONS.QuestionIcon />}
                isBackground={true}
                isRound={true}
              />
            </div>
          </div>
          {width < 767 ? (
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
          ) : null}
          <h2 className={styles.previous}>Раніше переглянуті</h2>
          <div className={styles.previousCards}>
            {/*  <Slider /> */}
            <div className={styles.helpButton}>
              {' '}
              <IconButton
                icon={<ICONS.QuestionIcon />}
                isBackground={true}
                isRound={true}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
export default ItemCard;
