import React, { useRef } from 'react';
import styles from './RevealAnimation.module.scss';
import { motion } from 'framer-motion';

const RevealAnimation = ({ data, lastPosition }) => {
  const ref = useRef(null);
  const cover = {
    initial: { opacity: 0.7 },
    animated: {
      opacity: 0,
      transition: {
        delay: 0.25,
        durtion: 3.72,
        ease: 'ease',
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
                animated: {
                  [name]: lastPosition < 150 ? -lastPosition : -150,
                  opacity: 1,
                  transition: transition,
                },
              }
            : {};
        return (
          <motion.li
            className={styles[`mainImgs__${img.name}`]}
            key={name}
            variants={variants}
            initial="initial"
            whileInView="animated"
            viewport={{ once: true, margin: '0px 0px -400px' }}
          >
            <img src={src} alt="Працівники Kvitkovo " />
            {name === 'main' && (
              <motion.div
                variants={cover}
                initial="initial"
                whileInView="animated"
                className={styles.mainImgs__main_cover}
                viewport={{ once: true, margin: '0px 0px -400px' }}
              ></motion.div>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default RevealAnimation;
