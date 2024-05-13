import React, { useEffect, useState } from 'react';
import CategoryOutput from './components/CategoryOutput';
import Carousel from './components/Carousel';
import carouselData from '../../../data/carouselData.json';
import styles from './HomePageComponent.module.scss';
// eslint-disable-next-line max-len
import { GetCategories } from '../../../services/catalog/categoryAccess.service';
import { useWindowSize } from '../../../hooks/useWindowSize';
import SmallCategories from './components/SmallCategories/SmallCategories';
import { useLocation } from 'react-router-dom';
import SuccessPopup from '../../common/SuccessPopup';

const HomePageComponent = () => {
  const { width } = useWindowSize();
  const location = useLocation();
  const [openPopup, setOpenPopup] = useState(
    location.state?.action === 'decor sended',
  );
  const [mainCategories, setMainCategories] = useState(null);

  useEffect(() => {
    if (width < 868) {
      const getCategories = async () => {
        try {
          const categories = await GetCategories();
          const mainCategories = categories.filter(
            (category) => category.parent === null,
          );
          setMainCategories(mainCategories);
        } catch (error) {
          console.error(error);
        }
      };
      getCategories();
    }
  }, [width]);
  useEffect(() => {
    if (openPopup) {
      setTimeout(() => {
        setOpenPopup(false);
      }, 3000);
    }
  }, [openPopup]);

  return (
    <>
      {openPopup && (
        <div className={styles.decorPopup}>
          <SuccessPopup>Ваша заявка успішно відправлена</SuccessPopup>
        </div>
      )}
      <Carousel data={carouselData.slides} />
      {mainCategories && (
        <ul className={styles.categorySlider}>
          {mainCategories.map((category) => {
            return (
              <li key={category.id}>
                <SmallCategories {...category} />
              </li>
            );
          })}
          <li>
            <SmallCategories
              name={'Декор із квітів'}
              icon={'DECOR'}
              link={'/decor'}
            />
          </li>
        </ul>
      )}
      <h2 className={styles.title}>
        <span>Акційна</span> ціна
      </h2>
      <CategoryOutput title="Акційна ціна" />
      <h2 className={styles.title}>Весільні букети</h2>
      <CategoryOutput title="Весільні букети" categoryId={2} />
      <h2 className={styles.title}>Квіти у кошику</h2>
      <CategoryOutput title="Квіти у кошику" categoryId={28} />
      <h2 className={styles.title}>Кімнатні квіти</h2>
      <CategoryOutput title="Кімнатні квіти" link={'#'} categoryId={29} />
    </>
  );
};
export default HomePageComponent;
