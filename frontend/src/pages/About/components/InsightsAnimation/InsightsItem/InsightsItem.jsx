import React from 'react';
import { motion } from 'framer-motion';
import { useWindowSize } from '../../../../../hooks/useWindowSize';

const InsightsItem = ({ unit, animation, inView, children }) => {
  const { width } = useWindowSize();
  const parametrs = width < 868 ? unit.mobileVersion : unit;

  const variantsForthStep = (item) => {
    const { rightPos, topPos, rotate, rotateB, scaleY, scaleX, scale } = item;
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
        rotate: rotateB,
        transition: {
          delay: 3.5,
          type: 'spring',
          stiffness: 41,
          damping: 9,
          mass: 1,
        },
      },
    };
  };

  const variantsThirdStep = (item) => {
    const { topPos, rightPos } = item;
    return {
      animated: {
        right: rightPos[0],
        top: topPos[0],
        transition: { delay: 1.5, ...animation },
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
      variants={variantsThirdStep(parametrs)}
      initial="initial"
      animate={inView ? 'animated' : 'initial'}
    >
      <motion.div
        style={{ position: 'relative' }}
        variants={variantsForthStep(parametrs)}
        initial="initial"
        animate={inView ? 'animated' : 'initial'}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default InsightsItem;
