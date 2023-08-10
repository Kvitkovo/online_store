import React, { useState, useEffect } from 'react';
import '../scss/Home.scss';
import Carousel from '../components/Carousel/Carousel';
import data from '../data/carouselData.json';
import DiscountPrice from '../components/ui-kit/components/DiscountPrice';
import Card from '../components/Card';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://195.191.104.138:4446/v1/products')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="home">
      <Carousel data={data.slides} />
      <div className="padding">
        <DiscountPrice oldPrice="2000" actualPrice="1500" />
        <DiscountPrice oldPrice="2000" actualPrice="2000" />
      </div>
      <div className="cardOutput">
        {data &&
          data.map((card) => (
            <Card
              image={card.images[0].urlSmall}
              title={card.title}
              discount={card.discount}
              oldPrice={card.priceWithDiscount}
              price={card.price}
              key={card.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
