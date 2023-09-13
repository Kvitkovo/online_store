import React, { useState, useEffect } from 'react';
import styles from '../scss/Home.module.scss';
import Carousel from '../components/Carousel';
import carouselData from '../data/carouselData.json';
import DiscountPrice from '../components/ui-kit/components/DiscountPrice';
import Card from '../components/Card';
import getAllCards from '../api/getAllCards';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCards().then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className={styles.home}>
      <Carousel data={carouselData.slides} />
      <div className="padding">
        <DiscountPrice oldPrice="2000" actualPrice="1500" />
        <DiscountPrice oldPrice="2000" actualPrice="2000" />
      </div>
      <div className={styles.cardOutput}>
        {data &&
          data.map((card) => (
            <Card
              bouquet={card.allowAddToConstructor}
              image={
                card.images[0]
                  ? card.images[0].urlSmall
                  : './images/no_image.jpg'
              }
              title={card.title}
              discount={card.discount}
              oldPrice={card.priceWithDiscount}
              price={card.price}
              key={card.id}
            />
          ))}
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
