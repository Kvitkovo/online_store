import React from 'react';
import styles from './RevealAnimation.module.scss';
import { motion } from 'framer-motion';

const RevealAnimation = ({ data }) => {
  const cover = { initial: { opacity: 0.7 }, animated: { opacity: 0 } };

  return (
    <ul className={styles.mainImgs}>
      {data.map((img) => {
        const { name, src, transition } = img;
        const variants =
          name !== 'main'
            ? {
                initial: { [name]: 350, opacity: 0 },
                animated: { [name]: 0, opacity: 1 },
              }
            : {};
        return (
          <motion.li
            className={styles[`mainImgs__${img.name}`]}
            key={name}
            variants={variants}
            initial="initial"
            whileInView="animated"
            transition={transition}
            viewport={{ once: true }}
          >
            <img src={src} alt="Працівники Kvitkovo " />
            {name === 'main' && (
              <motion.div
                variants={cover}
                initial="initial"
                whileInView="animated"
                className={styles.mainImgs__main_cover}
                transition={{ durtion: 0.75, delay: 0 }}
                viewport={{ once: true }}
              ></motion.div>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default RevealAnimation;
