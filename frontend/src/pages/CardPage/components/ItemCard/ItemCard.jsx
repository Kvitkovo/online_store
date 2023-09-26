import React from 'react';
import styles from './ItemCard.module.scss';
/* eslint-disable-next-line max-len */
import DiscountPrice from '../../../../components/ui-kit/components/DiscountPrice';
import Button from '../../../../components/ui-kit/components/Button';
import { ICONS } from '../../../../components/ui-kit/icons';
import Wrapper from '../../../../components/Wrapper';
import IconButton from '../../../../components/ui-kit/components/IconButton';
/* import Slider from '../CardPage/components/Slider'; */
import CardPageMobile from '../../../CardPage/components/CardPageMobile';
import Path from '../../components/Path';
import ItemImage from '../ItemImage/ItemImage';
import ItemDescription from './ItemDescription/ItemDescription';

const ItemCard = () => {
  return (
    <div className={styles.mainPage}>
      <Wrapper>
        <div className={styles.cardPageMobile}>
          <CardPageMobile />
        </div>
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
                <ItemDescription />

                <div className={styles.price}>
                  <DiscountPrice oldPrice={4864} actualPrice={4000} />
                </div>

                <div className={styles.buttons}>
                  <Button
                    variant="primary"
                    label="Додати у кошик"
                    padding="padding-sm"
                    icon={<ICONS.toCart />}
                    onClick={() => alert('clicked cart')}
                  />
                  <div className={styles.bouquetDesktop}>
                    <Button
                      variant="no-border"
                      label="Додати до букету"
                      padding="padding-header-sm"
                      reverse="true"
                      icon={<ICONS.toBouquet />}
                      onClick={() => alert('clicked bouquete')}
                    />
                  </div>
                  <div className={styles.bouquetTablet}>
                    {' '}
                    <IconButton icon={<ICONS.BouquetIcon />} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.descriptionContainerTablet}>
              <p className={styles.descriptionTablet}> Опис: </p>
              <p className={styles.itemDescription}>
                101 троянда червоного кольору сорту Гран Прі або Престиж.
                Будь-яка жінка відчує себе неперевершеною королевою, отримавши в
                подарунок цей шикарний букет зі 101 червоної троянди. Червоні
                троянди мовою квітів є символом щирого, пристрасного кохання
              </p>
            </div>
            <div className={styles.helpButton}>
              {' '}
              <IconButton
                icon={<ICONS.QuestionIcon />}
                isBackground={true}
                isRound={true}
              />
            </div>
          </div>
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
