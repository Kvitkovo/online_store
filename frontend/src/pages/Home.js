import React from 'react';
import '../scss/Home.scss';
import Carousel from '../components/Carousel/Carousel';
import data from '../data/carouselData.json';
import DiscountPrice from '../components/ui-kit/components/DiscountPrice';

const Home = () => {
  return (
    <div className="home">
      <Carousel data={data.slides} />
      <div className="padding">
        <DiscountPrice discount="10" oldPrice="2000" actualPrice="1500" />
        <DiscountPrice discount={0} oldPrice="2000" actualPrice="1500" />
      </div>
    </div>
  );
};

export default Home;
