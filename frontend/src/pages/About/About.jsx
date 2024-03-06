import React from 'react';
import styles from './About.module.scss';
import Path from '../CardPage/components/Path';
import servicesData from '../../data/aboutUsData.json';
import Services from './Services';

const About = () => {
  return (
    <>
      <Path currentPageData={{ name: 'Про Нас' }} currentPageType={'section'} />
      <section className={styles.mainSection}>
        <h1 className={styles.mainSection__title}>
          <div>
            Ласкаво просимо до
            <span className={styles.highlighted}> Kvitkovo!</span>
          </div>
          <div>
            <span className={styles.highlighted}>Ваш </span>
            особистий квітковий арт-простір!
          </div>
        </h1>
        <p className={styles.mainSection__description}>
          В Kvitkovo ми розуміємо, наскільки важливо дарувати радість та красу у
          кожному моменті. Наш інтернет-магазин квітів — це не просто місце для
          покупок, але і куточок, де кожен квітковий букет стає часткою Ваших
          емоцій та важливих подій.
        </p>
        <div className={styles.mainImgs}>
          <div className={styles.mainImgs__left}>
            <img
              src="/images/about-us/first_screen_left.jpg"
              alt="Працівники Kvitkovo "
            />
          </div>
          <div className={styles.mainImgs__main}>
            <img
              src="/images/about-us/first_screen_main.jpg"
              alt="Працівники Kvitkovo "
            />
          </div>
          <div className={styles.mainImgs__right}>
            <img
              src="/images/about-us/first_screen_right.jpg"
              alt="Працівники Kvitkovo "
            />
          </div>
        </div>
      </section>
      <section className={styles.mission}>
        <div className={styles.mission__text}>
          <h3 className={styles.mission__title}>Наша Місія:</h3>
          <p className={styles.mission__description}>
            В Kvitkovo, ми прагнемо дарувати красу та тепло через квіти, роблячи
            кожен момент особливим. Ми створили цей магазин для того, щоб
            допомагати вам виражати свою любов, повагу, турботу та радість через
            найпрекрасніший спосіб – квіти.
          </p>
        </div>
        <div className={styles.mission__image}>
          <img src="/images/about-us/second_screen.jpg" alt="Оранжерея" />
        </div>
      </section>
      <section className={styles.services}>
        <div className={styles.services__bg}></div>
        <div className={styles.services__content}>
          <h2 className={styles.services__title}>Наші Основні Послуги:</h2>
          <Services data={servicesData.services} />
        </div>
      </section>
    </>
  );
};
export default About;
