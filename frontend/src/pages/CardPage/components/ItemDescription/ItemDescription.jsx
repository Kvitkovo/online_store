import React from 'react';
import styles from './ItemDescription.module.scss';

const ItemDescription = ({ description }) => {
  return (
    <>
      {description && (
        <div className={styles.descriptionContainer}>
          <p className={styles.description}> Опис: </p>
          <p className={styles.itemDescription}>{description}</p>
        </div>
      )}
    </>
  );
};
export default ItemDescription;
