import React from 'react';
import { useScroll } from '../../hooks/useScroll';
import Path from '../CardPage/components/Path';
import infoData from '../../data/aboutUsData.json';
import Services from './components/Services';
import InsightList from './components/InsightList';
import RevealAnimation from './components/RevealAnimation';
import MissionScreen from './components/MissionScreen';
import ConclusionAnimation from './components/ConclusionAnimation';
import styles from './About.module.scss';

const About = () => {
  useScroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
    scrollOnMount: true,
  });
  const maxContainerWidth = 1180;
  const lastPosition =
    window.innerWidth >= maxContainerWidth + 20
      ? (window.innerWidth - maxContainerWidth - 50) / 2
      : 0;

  return (
    <>
      <Path currentPageData={{ name: 'Про Нас' }} currentPageType={'section'} />
      <section className={styles.mainSection}>
        <h1 className={styles.mainSection__title}>
          <div>
            Ласкаво просимо до
            <span className={styles.highlighted}> Kvitkovo!</span>
          </div>
          <div className={styles.secondLineTitle}>
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
        <RevealAnimation
          data={infoData.mainScreenImgs}
          lastPosition={lastPosition}
        />
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
        <MissionScreen />
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
          <ConclusionAnimation
            data={infoData.conclusionImages}
            lastPosition={lastPosition}
          />
        </div>
      </section>
    </>
  );
};
export default About;
