import React from 'react';
import styles from '../scss/Home.module.scss';
import Carousel from '../components/Carousel';
import carouselData from '../data/carouselData.json';
import DiscountPrice from '../components/ui-kit/components/DiscountPrice';
import Card from '../components/common/Card';

const Home = () => {
  return (
    <div className={styles.home}>
      <Carousel data={carouselData.slides} />
      <div className="padding">
        <DiscountPrice oldPrice="2000" actualPrice="1500" />
        <DiscountPrice oldPrice="2000" actualPrice="2000" />
      </div>
      <div className={styles.cardOutput}>
        <Card
          bouquet={false}
          image="./images/bouquet.jpg"
          title="Букет “101 троянда”"
          discount={0}
          price="1234"
        />
        <Card
          image="./images/bouquet.jpg"
          title="Троянда червона"
          discount={10}
          oldPrice="400"
          price="200"
        />
        <Card
          status="NO_ACTIVE"
          bouquet={false}
          image="./images/bouquet.jpg"
          title="Букет “101 троянда”"
          discount={0}
          oldPrice="1234"
          price="1234"
        />
      </div>
    </div>
  );
};

export default Home;
