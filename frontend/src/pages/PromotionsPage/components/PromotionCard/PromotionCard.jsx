import React from 'react';
import styles from './PromotionCard.module.scss';

const PromotionCard = ({ imageUrl, text, promotionDuration, discount }) => {
  const parts = text.split(discount);

  return (
    <div className={styles['promotion']}>
      <div className={styles['promotion-thumb']}>
        <img alt={text} src={imageUrl} className={styles['promotion-banner']} />
      </div>
      <div className={styles['promotion-content']}>
        <p className={styles['promotion-text']}>
          {parts[0]}
          <span className={styles['promotion-text-accent']}>{discount}</span>
          {parts[1]}
        </p>
        <div className={styles['promotion-duration']}>
          <p className={styles['duration-text']}>До кінця акції залишилось:</p>
          <p className={styles['duration-value']}>{promotionDuration}</p>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
