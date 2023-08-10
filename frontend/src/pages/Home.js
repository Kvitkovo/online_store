import React from 'react';
import '../scss/Home.scss';
import Carousel from '../components/Carousel/Carousel';
import data from '../data/carouselData.json';
import DiscountPrice from '../components/ui-kit/components/DiscountPrice';
import Card from '../components/Card';

const Home = () => {
  return (
    <div className="home">
      <Carousel data={data.slides} />
      <div className="padding">
        <DiscountPrice oldPrice="2000" actualPrice="1500" />
        <DiscountPrice oldPrice="2000" actualPrice="2000" />
      </div>
      <Card
        image="./images/bouquet.jpg"
        title="Букет “101 троянда”"
        discount="15"
        oldPrice="2456"
        price="1234"
      />
    </div>
  );
};

export default Home;
