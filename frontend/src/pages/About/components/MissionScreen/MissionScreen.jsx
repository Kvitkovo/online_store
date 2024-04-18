import React from 'react';
import styles from './MissionScreen.module.scss';
import { motion } from 'framer-motion';

const MissionScreen = () => {
  const animationPoints = {
    initial: { opacity: 0 },
    animated: { opacity: 1 },
  };
  return (
    <div className={styles.image}>
      <picture>
        <source
          media="(max-width: 1180px and min-width: 868px)"
          srcSet="/images/about-us/second_screen__tablet.jpg"
        />
        <img src="/images/about-us/second_screen.jpg" alt="Оранжерея" />
      </picture>
      <motion.div
        layout
        variants={animationPoints}
        initial="initial"
        whileInView={{
          opacity: [0, 1, 0],
          transition: {
            times: [0, 0.2, 1],
            duration: 3,
            ease: 'easeInOut',
          },
        }}
        viewport={{ once: true, margin: '-30% 0%' }}
        className={styles.image__cover}
      ></motion.div>
      <motion.img
        variants={animationPoints}
        initial="initial"
        whileInView="animated"
        viewport={{ once: true, margin: '-30% 0%' }}
        transition={{
          delay: 0.8,
        }}
        src="/images/about-us/second_screen__small.jpg"
        alt="Оранжерея"
        className={styles.image__smallCopy}
      />
    </div>
  );
};

export default MissionScreen;
