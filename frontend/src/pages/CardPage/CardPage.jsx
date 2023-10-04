import React from 'react';
import styles from './CardPage.module.scss';
import ItemCard from './components/ItemCard/ItemCard';

const CardPage = ({ cardData }) => {
  return (
    <div className={styles.mainPage}>
      <ItemCard cardData={cardData} />
    </div>
  );
};
export default CardPage;
