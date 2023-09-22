import React from 'react';
import CategoryOutput from './components/CategoryOutput';
import Wrrapper from '../../Wrraper/Wrraper';
import Carousel from './components/Carousel';
import carouselData from '../../../data/carouselData.json';

const HomePageComponent = () => {
  return (
    <Wrrapper>
      <Carousel data={carouselData.slides} />
      <CategoryOutput
        title={'Акційна ціна'}
        api={'v1/products/discounted?page=1&size=8'}
        link={'#'}
      />
      <CategoryOutput
        title={'Весільні букети'}
        api={'v1/products/category?page=1&size=4&categoryId=2'}
        link={'#'}
      />
      <CategoryOutput
        title={'Квіти у кошику'}
        api={'v1/products/category?page=1&size=4&categoryId=28'}
        link={'#'}
      />
      <CategoryOutput
        title={'Кімнатні квіти'}
        api={'v1/products/category?page=1&size=4&categoryId=29'}
        link={'#'}
      />
    </Wrrapper>
  );
};
export default HomePageComponent;
