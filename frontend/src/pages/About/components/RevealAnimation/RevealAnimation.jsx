import React, { useRef } from 'react';
import styles from './RevealAnimation.module.scss';
import { motion } from 'framer-motion';

const RevealAnimation = ({ data }) => {
  const ref = useRef(null);
  const cover = { initial: { opacity: 0.7 }, animated: { opacity: 0 } };

  return (
    <ul ref={ref} className={styles.mainImgs}>
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
            viewport={{ once: true, margin: '-50% 0px' }}
          >
            <img src={src} alt="Працівники Kvitkovo " />
            {name === 'main' && (
              <motion.div
                variants={cover}
                initial="initial"
                whileInView={{ opacity: [0.75, 0.5, 0.25, 0.1, 0] }}
                className={styles.mainImgs__main_cover}
                transition={{
                  times: [0, 0.2, 0.4, 0.9, 1],
                  durtion: 0.75,
                  delay: 0.25,
                }}
                viewport={{ once: true, margin: '-50% 0px' }}
              ></motion.div>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default RevealAnimation;
