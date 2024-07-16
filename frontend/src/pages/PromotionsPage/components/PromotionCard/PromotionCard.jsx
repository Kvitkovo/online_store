import React from 'react';
import styles from './PromotionCard.module.scss';

const PromotionCard = ({
  imageUrl,
  title,
  text,
  promotionDuration,
  discount,
}) => {
  const parts = text.split(discount);

  return (
    <div className={styles['promotion']}>
      <div className={styles['promotion-thumb']}>
        <img
          alt={text}
          src={imageUrl}
          className={styles['promotion-banner']}
          width="690"
        />
      </div>
      <div className={styles['promotion-content']}>
        <div className={styles['content']}>
          {title ? (
            <h2 className={styles['promotion-title']}>{title}</h2>
          ) : null}
          <p className={styles['promotion-text']}>
            {parts[0]}
            <span className={styles['promotion-text-accent']}>{discount}</span>
            {parts[1]}
          </p>
        </div>
        <div className={styles['promotion-duration']}>
          <p className={styles['duration-text']}>До кінця акції залишилось:</p>
          <p className={styles['duration-value']}>{promotionDuration}</p>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
