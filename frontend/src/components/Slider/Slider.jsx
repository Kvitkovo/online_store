import React from 'react';
import styles from './Slider.module.scss';
import IconButton from '../ui-kit/components/IconButton';
import { ICONS } from '../ui-kit/icons';
import Card from '../common/Card/Card';

const Slider = () => {
  return (
    <div className={styles.sliderContainer}>
      <div>
        <IconButton
          icon={<ICONS.ArrowLeftIcon />}
          isRound={true}
          isOpacity={true}
        />
      </div>
      <div className={styles.cardWrapper}>
        <div className={styles.cardContainer}>
          <Card
            image="./images/bouquet.jpg"
            title="Троянда червона"
            bouquet={true}
            discount={10}
            oldPrice="400"
            price="200"
          />
          <Card
            image="./images/bouquet.jpg"
            title="Троянда червона"
            bouquet={true}
            discount={10}
            oldPrice="400"
            price="200"
          />
          <Card
            image="./images/bouquet.jpg"
            title="Троянда червона"
            bouquet={true}
            discount={10}
            oldPrice="400"
            price="200"
          />
          <Card
            image="./images/bouquet.jpg"
            title="Троянда червона"
            bouquet={true}
            discount={10}
            oldPrice="400"
            price="200"
          />
        </div>
      </div>
      <div>
        <IconButton
          icon={<ICONS.ArrowRightIcon />}
          isRound={true}
          isOpacity={true}
        />
      </div>
    </div>
  );
};
export default Slider;
