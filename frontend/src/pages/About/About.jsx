import React from 'react';
import styles from './About.module.scss';
import Path from '../CardPage/components/Path';
import infoData from '../../data/aboutUsData.json';
import Services from './components/Services';
import InsightList from './components/InsightList';
import { motion } from 'framer-motion';

const About = () => {
  const cover = { initial: { opacity: 0.5 }, animated: { opacity: 0 } };
  const leftImg = {
    initial: { left: 350, opacity: 0 },
    animated: { left: 0, opacity: 1 },
  };
  const rightImg = {
    initial: { right: 350, opacity: 0 },
    animated: { right: 0, opacity: 1 },
  };
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
          <motion.div
            className={styles.mainImgs__left}
            variants={leftImg}
            initial="initial"
            animate="animated"
            transition={{
              durtion: 0.25,
              delay: 1.25,
              type: 'spring',
              stiffness: 234,
              damping: 17.65,
              mass: 1,
            }}
          >
            <img
              src="/images/about-us/first_screen_left.jpg"
              alt="Працівники Kvitkovo "
            />
          </motion.div>
          <div className={styles.mainImgs__main}>
            <img
              src="/images/about-us/first_screen_main.jpg"
              alt="Працівники Kvitkovo "
            />
            <motion.div
              variants={cover}
              initial="initial"
              animate="animated"
              className={styles.mainImgs__main_cover}
              transition={{ durtion: 0.75, delay: 0.25 }}
            ></motion.div>
          </div>
          <motion.div
            className={styles.mainImgs__right}
            variants={rightImg}
            initial="initial"
            animate="animated"
            transition={{
              durtion: 0.25,
              delay: 1,
              type: 'spring',
              stiffness: 234,
              damping: 17.65,
              mass: 1,
            }}
          >
            <img
              src="/images/about-us/first_screen_right.jpg"
              alt="Працівники Kvitkovo "
            />
          </motion.div>
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
          <Services data={infoData.services} />
        </div>
      </section>
      <section className={styles.insights}>
        <h2 className={styles.insights__title}>Чому саме Kvitkovo?</h2>
        <InsightList data={infoData.insights} />
      </section>
      <section className={styles.conclusion}>
        <h2 className={styles.conclusion__title}>Kvitkovo</h2>
        <p className={styles.conclusion__description}>
          Там, де кожен букет – це історія кохання, поваги та краси. Робіть світ
          яскравішим разом із нами!
        </p>
        <div className={styles.conclusion__images}>
          {infoData.conclusionImages.map((image) => (
            <img src={image} alt="Kvitkovo" key={image} />
          ))}
        </div>
      </section>
    </>
  );
};
export default About;
