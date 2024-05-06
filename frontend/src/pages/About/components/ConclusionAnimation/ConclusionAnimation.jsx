import React from 'react';
import styles from './ConclusionAnimation.module.scss';
import { motion } from 'framer-motion';

const ConclusionAnimation = ({ data, lastPosition }) => {
  return data.map((image) => {
    const { initial, name, src, animatedSM } = image;
    const lastPositionInPercent =
      ((lastPosition - 20) * 100) / window.innerWidth;
    const animated =
      name !== 'main'
        ? {
            top: 80,
            rotate: name === 'left' ? -18 : 18,
            [name]: lastPosition < 150 ? `${-lastPositionInPercent}%` : '-10%',
          }
        : {};
    let device;
    switch (true) {
      case window.innerWidth < 868 && window.innerWidth > 510:
        device = 1;
        break;
      case window.innerWidth <= 510:
        device = 0;
        break;
      default:
        device = 2;
    }
    return (
      <motion.img
        src={src}
        alt="Kvitkovo"
        key={src}
        className={styles.conclusionImg}
        initial={initial[device]}
        whileInView={window.innerWidth >= 868 ? animated : animatedSM[device]}
        viewport={{ once: true, margin: '0px 0px -150px' }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      />
    );
  });
};

export default ConclusionAnimation;
