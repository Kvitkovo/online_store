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
        <DiscountPrice oldPrice="2000" actualPrice="1500" />
      </div>
    </div>
  );
};

export default Home;
