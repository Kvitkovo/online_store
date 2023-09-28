import React from 'react';
import styles from './ItemDescription.module.scss';

const ItemDescription = () => {
  return (
    <div>
      <div className={styles.descriptioContainer}>
        <p className={styles.description}> Опис: </p>
        <p className={styles.itemDescription}>
          101 троянда червоного кольору сорту Гран Прі або Престиж. Будь-яка
          жінка відчує себе неперевершеною королевою, отримавши в подарунок цей
          шикарний букет зі 101 червоної троянди. Червоні троянди мовою квітів є
          символом щирого, пристрасного кохання
        </p>
      </div>
    </div>
  );
};
export default ItemDescription;
