import React from 'react';
import Card from '../../../../../components/common/Card/Card';
import styles from './Slide.module.scss';

const Slide = ({ card }) => {
  return (
    <swiper-slide class={styles.slide}>
      <Card
        image={
          card.images?.length > 0
            ? card.images[0]?.urlSmall
            : '../images/no_image.jpg'
        }
        available={card.available}
        title={card.title}
        discount={card.discount}
        oldPrice={card.price}
        price={card.priceWithDiscount}
        id={card.id}
      />
    </swiper-slide>
  );
};

export default Slide;
