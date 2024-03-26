import React from 'react';
import { motion } from 'framer-motion';

const InsightsItem = ({ unit, animation, children }) => {
  const forthStepTransition = {
    type: 'spring',
    stiffness: 41,
    damping: 9,
    mass: 1,
  };
  const variantsForthStep = (topPos, rightPos) => ({
    initial: {
      right: -95,
      top: '200px',
      width: '100px',
    },
    animated: {
      right: rightPos,
      top: topPos,
      width: 'auto',
      transition: { delay: 2.4, ...forthStepTransition },
    },
  });
  const variantsThirdStep = (item) => {
    const { topPos, rightPos, rotate, scaleX, scale } = item;
    return {
      animated: {
        right: rightPos[0],
        top: topPos[0],
        transition: { delay: 1.2, ...animation },
      },
      initial: {
        rotate: rotate,
        scale: scale,
        scaleX: scaleX,
      },
    };
  };

  return (
    <motion.div
      style={{ position: 'absolute' }}
      variants={variantsForthStep(unit.topPos[1], unit.rightPos[1])}
      initial="initial"
      whileInView="animated"
      viewport={{ once: true, margin: '-20px 0px -50px' }}
    >
      <motion.div
        style={{ position: 'absolute' }}
        variants={variantsThirdStep(unit)}
        initial="initial"
        whileInView="animated"
        viewport={{ once: true, margin: '-20px 0px -50px' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default InsightsItem;
