import React, { useRef } from 'react';
import styles from './RevealAnimation.module.scss';
import { motion } from 'framer-motion';

const RevealAnimation = ({ data }) => {
  const ref = useRef(null);
  const cover = {
    initial: { opacity: 0.5 },
    animated: {
      opacity: 0,
      transition: {
        opacity: {
          durtion: 0.72,
          ease: 'easeOut',
        },
      },
    },
  };

  return (
    <ul ref={ref} className={styles.mainImgs}>
      {data.map((img) => {
        const { name, src, transition } = img;
        const variants =
          name !== 'main'
            ? {
                initial: { [name]: 350, opacity: 0 },
                animated: { [name]: 0, opacity: 1, transition: transition },
              }
            : {};
        return (
          <motion.li
            className={styles[`mainImgs__${img.name}`]}
            key={name}
            variants={variants}
            initial="initial"
            whileInView="animated"
            transition={{ delay: 2.5 }}
            viewport={{ once: true, margin: '-50% 0px' }}
          >
            <img src={src} alt="Працівники Kvitkovo " />
            {name === 'main' && (
              <motion.div
                variants={cover}
                initial="initial"
                whileInView="animated"
                className={styles.mainImgs__main_cover}
                viewport={{ once: true, margin: '-60% 0px' }}
              ></motion.div>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default RevealAnimation;
