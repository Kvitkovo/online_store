import React from 'react';
import styles from './CardPageMobile.module.scss';
import Button from '../../../../components/ui-kit/components/Button';
import IconButton from '../../../../components/ui-kit/components/IconButton';
import { ICONS } from '../../../../components/ui-kit/icons';
import Discount from '../../../../components/ui-kit/components/Discount';
/* eslint-disable-next-line max-len */
import DiscountPrice from '../../../../components/ui-kit/components/DiscountPrice';
/* import Slider from '../../../Slider'; */

const CardPageMobile = () => {
  const ButtonFullWidth = true;
  return (
    <div className={styles.mainPage}>
      <div className={styles.pathContainer}>
        <p className={styles.path}>
          Головна <span> &gt; </span> Букети з квітів <span> &gt;</span> Букет
          “101” троянда Головна <span> &gt; </span> Букети з квітів{' '}
          <span> &gt;</span> Букет “101” троянда
        </p>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.itemContainer}>
          <h1 className={styles.itemName}>Букет &rdquo;101&rdquo; троянда</h1>
          <div className={styles.itemImage}>
            <div className={styles.discount}>
              <Discount discount="15" />
            </div>
            <img src="./images/itemCard.jpg" alt="" />
          </div>
          <div className={styles.price}>
            <DiscountPrice oldPrice={4864} actualPrice={4000} />
            <span className={styles.bouquetMobile}>
              {' '}
              <IconButton icon={<ICONS.BouquetIcon />} />
            </span>
          </div>
          <div className={styles.toCart}>
            <Button
              variant="primary"
              label="Додати у кошик"
              padding="padding-sm"
              icon={<ICONS.toCart />}
              onClick={() => alert('clicked cart')}
              isFullWidth={ButtonFullWidth}
            />
          </div>
          <div className={styles.features}>
            <p>
              Вид квітів: <span className={styles.type}> Троянди</span>
            </p>
            <p>
              Колір: <span className={styles.type}>Червоний</span>{' '}
            </p>
            <p>
              {' '}
              Висота букета: <span className={styles.type}>55-60см</span>{' '}
            </p>
          </div>
          <div className={styles.descriptioContainer}>
            <p className={styles.description}> Опис: </p>
            <p className={styles.itemDescription}>
              101 троянда червоного кольору сорту Гран Прі або Престиж. Будь-яка
              жінка відчує себе неперевершеною королевою, отримавши в подарунок
              цей шикарний букет зі 101 червоної троянди. Червоні троянди мовою
              квітів є символом щирого, пристрасного кохання
            </p>
            <div className={styles.helpButton}>
              {' '}
              <IconButton
                icon={<ICONS.QuestionIcon />}
                isBackground={true}
                isRound={true}
              />
            </div>
          </div>
          <h1 className={styles.previous}>Раніше переглянуті</h1>
          {/*  <Slider /> */}
        </div>
      </div>
    </div>
  );
};
export default CardPageMobile;
