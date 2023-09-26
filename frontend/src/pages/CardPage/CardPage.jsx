import React from 'react';
import styles from './CardPage.module.scss';
import ItemCard from './components/ItemCard/ItemCard';

const CardPage = () => {
  return (
    <div className={styles.mainPage}>
      <ItemCard />
    </div>
  );
};
export default CardPage;
