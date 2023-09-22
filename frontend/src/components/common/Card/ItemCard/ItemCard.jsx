import React from 'react';
import styles from './ItemCard.module.scss';
import DiscountPrice from '../../../ui-kit/components/DiscountPrice';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';
import Discount from '../../../ui-kit/components/Discount/Discount';
import Wrapper from '../../../Wrapper';
import IconButton from '../../../ui-kit/components/IconButton';
import Slider from '../../../Slider';

const ItemCard = () => {
  return (
    <div className={styles.mainPage}>
      <Wrapper>
        <p className={styles.path}>
          Головна <span> &gt; </span> Букети з квітів <span> &gt;</span> Букет
          “101” троянда{' '}
        </p>
        <div className={styles.itemContainer}>
          <div className={styles.itemImage}>
            <div className={styles.discount}>
              <Discount discount="15" isBigCard={true} />
            </div>
            <img src="./images/itemCard.jpg" alt="" />
          </div>

          <div className={styles.itemDescriptionContainer}>
            <h1>Букет &rdquo;101&rdquo; троянда</h1>
            <div className={styles.rating}>
              <IconButton icon={<ICONS.starColor />} />
              <IconButton icon={<ICONS.starColor />} />
              <IconButton icon={<ICONS.starColor />} />
              <IconButton icon={<ICONS.starNoColor />} />
              <IconButton icon={<ICONS.starNoColor />} />
            </div>
            <p> Опис: </p>
            <p className={styles.itemDescription}>
              101 троянда червоного кольору сорту Гран Прі або Престиж. Будь-яка
              жінка відчує себе неперевершеною королевою, отримавши в подарунок
              цей шикарний букет зі 101 червоної троянди. Червоні троянди мовою
              квітів є символом щирого, пристрасного кохання
            </p>
            <div className={styles.features}>
              <p>
                Вид квітів: <span className={styles.type}> Троянди</span>
              </p>
              <p>
                Колір: <span className={styles.type}>Червоний</span>{' '}
              </p>
              <p>
                Висота букета: <span className={styles.type}>55-60см</span>{' '}
              </p>
            </div>

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
              <Button
                variant="no-border"
                label="Додати до букету"
                padding="padding-header-sm"
                reverse="true"
                icon={<ICONS.toBouquet />}
                onClick={() => alert('clicked bouquete')}
              />
            </div>
          </div>
        </div>
        <h1 className={styles.previous}>Раніше переглянуті</h1>
        <div className={styles.previousCards}>
          <Slider />
        </div>
      </Wrapper>
    </div>
  );
};
export default ItemCard;
