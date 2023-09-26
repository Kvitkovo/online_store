import React from 'react';
import styles from './ItemDescription.module.scss';

const ItemDescription = () => {
  return (
    <div>
      <h1 className={styles.itemName}>Букет &rdquo;101&rdquo; троянда</h1>
      <div className={styles.descriptioContainer}>
        <p className={styles.description}> Опис: </p>
        <p className={styles.itemDescription}>
          101 троянда червоного кольору сорту Гран Прі або Престиж. Будь-яка
          жінка відчує себе неперевершеною королевою, отримавши в подарунок цей
          шикарний букет зі 101 червоної троянди. Червоні троянди мовою квітів є
          символом щирого, пристрасного кохання
        </p>
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
    </div>
  );
};
export default ItemDescription;
