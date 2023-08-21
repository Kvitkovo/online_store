import * as React from 'react';
import '../scss/Home.scss';
import Carousel from '../components/Carousel';
import Discount from '../components/ui-kit/components/Discount';

const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <Discount discount={15} />
      <Discount discount={15} isBigCard={true} />
    </div>
  );
};

export default Home;
