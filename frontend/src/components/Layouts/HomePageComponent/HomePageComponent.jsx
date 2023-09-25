import React from 'react';
import CategoryOutput from './components/CategoryOutput';
import Wrrapper from '../../Wrraper/Wrraper';
import Carousel from './components/Carousel';
import carouselData from '../../../data/carouselData.json';
import styles from './HomePageComponent.module.scss';

const HomePageComponent = () => {
  const categoryAPI = 'v1/products/category?page=1&size=4&categoryId=';
  return (
    <Wrrapper>
      <Carousel data={carouselData.slides} />
      <h2 className={styles.title}>
        <span>Акційна</span> ціна
      </h2>
      <CategoryOutput api="v1/products/discounted?page=1&size=8" link={'#'} />
      <h2 className={styles.title}>Весільні букети</h2>
      <CategoryOutput api={categoryAPI + '2'} link={'#'} />
      <h2 className={styles.title}>Квіти у кошику</h2>
      <CategoryOutput api={categoryAPI + '28'} link={'#'} />
      <h2 className={styles.title}>Кімнатні квіти</h2>
      <CategoryOutput api={categoryAPI + '29'} link={'#'} />
    </Wrrapper>
  );
};
export default HomePageComponent;
