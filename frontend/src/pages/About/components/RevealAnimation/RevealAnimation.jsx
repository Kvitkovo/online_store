import React, { useRef } from 'react';
import styles from './RevealAnimation.module.scss';
import { useInView } from 'framer-motion';

const RevealAnimation = ({ data }) => {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: '-40% 0%' });

  return (
    <ul
      ref={container}
      className={`${styles.mainImgs} ${isInView ? styles.animated : ''}`}
    >
      {data.map((img) => {
        const { name, src } = img;

        return (
          <li className={`${styles[`mainImgs__${img.name}`]} `} key={name}>
            <img src={src} alt="Працівники Kvitkovo " />
          </li>
        );
      })}
    </ul>
  );
};

export default RevealAnimation;
