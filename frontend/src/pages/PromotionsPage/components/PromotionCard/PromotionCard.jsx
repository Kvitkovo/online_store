import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const t = setInterval(() => {
      setTargetDay(getRemainingDays(promotionDuration));
    }, 1000 * 60);

    return () => clearInterval(t);
  }, [promotionDuration]);

  return (
    <div className={styles.promotion}>
      <img alt={text} src={imageUrl} className={styles.promotionBanner} />
      <div className={styles.promotionContent}>
        <div className={styles.content}>
          {title ? <h2 className={styles.promotionTitle}>{title}</h2> : null}
          <p className={styles.promotionText}>
            {parts[0]}
            {discount ? (
              <span className={styles.promotionTextAccent}>{discount}</span>
            ) : null}
            {parts[1]}
          </p>
        </div>
        <div className={styles.promotionDuration}>
          <p className={styles.durationText}>До кінця акції залишилось:</p>
          <p className={styles.durationValue}>
            {targetDay} {dayWord}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
