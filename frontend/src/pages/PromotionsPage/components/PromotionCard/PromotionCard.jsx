import React, { useEffect, useState } from 'react';
import { useScroll } from '../../../../hooks';
import { getDayWord, getRemainingDays } from '../../../../utils';
import styles from './PromotionCard.module.scss';

const PromotionCard = ({
  imageUrl,
  title,
  text,
  promotionDuration,
  discount,
}) => {
  const [targetDay, setTargetDay] = useState(
    getRemainingDays(promotionDuration),
  );

  const dayWord = getDayWord(targetDay);
  const parts = text.split(discount);

  useScroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
    scrollOnMount: true,
  });

  useEffect(() => {
    const t = setInterval(() => {
      setTargetDay(getRemainingDays(promotionDuration));
    }, 1000 * 60);

    return () => clearInterval(t);
  }, [promotionDuration]);

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
          <p className={styles['duration-value']}>
            {targetDay} {dayWord}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
