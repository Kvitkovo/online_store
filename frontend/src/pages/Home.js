import React from 'react';
import '../scss/Home.scss';
import Carousel from '../components/Carousel/Carousel';
import data from '../data/carouselData.json';

const Home = () => {
  return (
    <div className="home">
      <Carousel data={data.slides} />
    </div>
  );
};

export default Home;
