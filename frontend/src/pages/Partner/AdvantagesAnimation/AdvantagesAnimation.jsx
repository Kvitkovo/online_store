import React, { useState } from 'react';
import styles from './AdvantagesAnimation.module.scss';
import data from '../../../data/partnerData.json';
import IconButton from '../../../components/ui-kit/components/IconButton';
import { ICONS } from '../../../components/ui-kit/icons';

const AdvantagesAnimation = () => {
  const [activeId, setActiveId] = useState(0);
  const { advantages } = data;
  const handleChangeContent = (step) => {
    setActiveId((prev) => {
      if (
        (prev === 0 && step === -1) ||
        (prev === advantages.length - 1 && step === 1)
      ) {
        return prev;
      }
      return prev + step;
    });
  };
  return (
    <div className={styles.animated}>
      <div className={styles.animated__container}></div>
      <div className={styles.animated__content}>
        <div className={activeId === 0 ? styles.hidden : ''}>
          <IconButton
            icon={<ICONS.prevButton />}
            onClick={() => handleChangeContent(-1)}
          />
        </div>
        <div className={styles.animated__text}>
          <h3 className={styles.animated__title}>
            {advantages[activeId].title}
          </h3>
          <p className={styles.animated__desc}>
            {advantages[activeId].description}
          </p>
        </div>
        <div
          className={activeId === advantages.length - 1 ? styles.hidden : ''}
        >
          <IconButton
            icon={<ICONS.nextButton />}
            onClick={() => handleChangeContent(1)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvantagesAnimation;
