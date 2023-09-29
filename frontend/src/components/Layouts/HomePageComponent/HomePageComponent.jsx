import React from 'react';
import CategoryOutput from './components/CategoryOutput';
import Wrapper from '../../Wrapper';
import Carousel from './components/Carousel';
import carouselData from '../../../data/carouselData.json';
import styles from './HomePageComponent.module.scss';

const HomePageComponent = () => {
  return (
    <Wrapper>
      <Carousel data={carouselData.slides} />
      <h2 className={styles.title}>
        <span>Акційна</span> ціна
      </h2>
      <CategoryOutput title="Акційна ціна" link={'#'} />
      <h2 className={styles.title}>Весільні букети</h2>
      <CategoryOutput title="Весільні букети" link={'#'} />
      <h2 className={styles.title}>Квіти у кошику</h2>
      <CategoryOutput title="Квіти у кошику" link={'#'} />
      <h2 className={styles.title}>Кімнатні квіти</h2>
      <CategoryOutput title="Кімнатні квіти" link={'#'} />
    </Wrapper>
  );
};
export default HomePageComponent;
