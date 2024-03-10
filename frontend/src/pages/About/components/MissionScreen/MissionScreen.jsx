import React from 'react';
import styles from './MissionScreen.module.scss';
import { motion } from 'framer-motion';

export default function MissionScreen() {
  const animationPoints = {
    initial: { opacity: 0 },
    animated: { opacity: 1 },
  };
  return (
    <motion.div className={styles.image}>
      <img src="/images/about-us/second_screen.jpg" alt="Оранжерея" />
      <motion.div
        layout
        variants={animationPoints}
        initial="initial"
        whileInView={{ opacity: [0, 0.25, 0.75, 1, 0.75, 0.25, 0] }}
        transition={{
          duration: 5.5,
        }}
        viewport={{ once: true, margin: '-40% 0px' }}
        className={styles.image__cover}
      ></motion.div>
      <motion.img
        variants={animationPoints}
        initial="initial"
        whileInView="animated"
        viewport={{ once: true, margin: '-40% 0px' }}
        transition={{
          delay: 1.5,
          type: 'spring',
          mass: 1,
          stiffness: 5.96,
          damping: 5.45,
        }}
        src="/images/about-us/second_screen.jpg"
        alt="Оранжерея"
        className={styles.image__smallCopy}
      />
    </motion.div>
  );
}
