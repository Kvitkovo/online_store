import React from 'react';
import styles from './ItemCard.module.scss';
import DiscountPrice from '../../../ui-kit/components/DiscountPrice';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';

const ItemCard = () => {
  return (
    <div>
      <div className={styles.itemContainer}>
        <div className={styles.itemImage}>
          <img src="./images/bouquet.jpg" alt="" />
        </div>

        <div className={styles.itemDescriptionContainer}>
          <h1>Букет 101 троянда</h1>
          <div className={styles.rating}>⭐⭐⭐⭐⭐</div>
          <p> Опис: </p>
          <p className={styles.itemDescription}>
            101 троянда червоного кольору сорту Гран Прі або Престиж. Будь-яка
            жінка відчує себе неперевершеною королевою, отримавши в подарунок
            цей шикарний букет зі 101 червоної троянди. Червоні троянди мовою
            квітів є символом щирого, пристрасного кохання
          </p>
          <p>
            Вид квітів: <span className={styles.type}> Троянди</span>
          </p>
          <p>
            Колір: <span className={styles.type}>Червоний</span>{' '}
          </p>
          <p>
            Висота букета: <span className={styles.type}>55-60см</span>{' '}
          </p>
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
    </div>
  );
};
export default ItemCard;
