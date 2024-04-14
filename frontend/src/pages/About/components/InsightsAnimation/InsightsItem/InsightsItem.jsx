import React from 'react';
import { motion } from 'framer-motion';

const InsightsItem = ({ unit, animation, children }) => {
  const forthStepTransition = {
    type: 'spring',
    stiffness: 41,
    damping: 9,
    mass: 1,
  };
  const variantsForthStep = (item) => {
    const { rightPos, topPos, rotate, scaleY, scaleX, scale } = item;
    return {
      initial: {
        right: 0,
        top: 0,
        rotate: rotate,
        scale: scale,
        scaleX: scaleX,
        scaleY: scaleY,
      },
      animated: {
        right: rightPos[1],
        top: topPos[1],
        transition: { delay: 2.2, ...forthStepTransition },
      },
    };
  };

  const variantsThirdStep = (item) => {
    const { topPos, rightPos } = item;
    return {
      animated: {
        right: rightPos[0],
        top: topPos[0],
        transition: { delay: 1.2, ...animation },
      },
      initial: {
        right: -100,
        top: 0,
      },
    };
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      variants={variantsThirdStep(unit)}
      initial="initial"
      whileInView="animated"
      viewport={{ once: true, margin: '-20px 10px -50px' }}
    >
      <motion.div
        style={{ position: 'relative' }}
        variants={variantsForthStep(unit)}
        initial="initial"
        whileInView="animated"
        viewport={{ once: true, margin: '-20px 10px -50px' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default InsightsItem;
