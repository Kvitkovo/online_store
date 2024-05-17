import React, { useCallback, useRef } from 'react';
import { ICONS } from '../../../../components/ui-kit/icons';
import InsightsAnimationUnit from '../InsightsAnimationUnit';
import styles from './InsightsAnimation.module.scss';
import { motion, useInView } from 'framer-motion';
import InsightsItem from './InsightsItem';
const InsightsAnimation = () => {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: '-40% 0%' });

  const thirdStepTransition = {
    type: 'spring',
    stiffness: 80,
    damping: 25,
    mass: 1,
  };
  const valuesLeaves = [
    {
      rightPos: [371, 236],
      topPos: [10, 13],
      rotate: 186,
      scaleY: -1,
      mobileVersion: {
        rightPos: [200, -151],
        topPos: [20, -72],
        rotate: 186,
      },
    },
    {
      rightPos: [379, 42],
      topPos: [168, 219],
      rotate: 0,
      mobileVersion: {
        rightPos: [254, -160],
        topPos: [177, 6],
        rotateB: -52,
      },
    },
    {
      rightPos: [458, 169],
      topPos: [267, 274],
      rotate: 0,
      mobileVersion: {
        rightPos: [328, -6],
        topPos: [190, 358],
        rotateB: 171,
      },
    },
    {
      rightPos: [310, 235],
      topPos: [366, -27],
      rotate: 75,
      scaleY: -1,
      mobileVersion: {
        rightPos: [254, -209],
        topPos: [362, -25],
        rotate: 76,
      },
    },
  ];
  const valuesFlowers = [
    {
      rightPos: [264, 163],
      topPos: [26, 72],
      rotate: 0,
      mobileVersion: {
        rightPos: [83, -65],
        topPos: [18, 38],
        rotate: 13,
        rotateB: 63,
      },
    },
    {
      rightPos: [368, 163],
      topPos: [88, 53],
      rotate: 20,
      scale: 0.745,
      scaleX: -1,
      mobileVersion: {
        rightPos: [146, 151],
        topPos: [-4, 157],
        rotate: 23,
        rotateB: 89,
      },
    },
    {
      rightPos: [450, 32],
      topPos: [137, 94],
      rotate: -13,
      scaleX: -1,
      mobileVersion: {
        rightPos: [160, 30],
        topPos: [195, 157],
        rotate: -5,
        rotateB: -195,
      },
    },
    {
      rightPos: [413, 90],
      topPos: [351, 138],
      rotate: -13,
      scaleX: -1,
      mobileVersion: {
        rightPos: [175, -81],
        topPos: [379, 120],
        rotate: -5,
        rotateB: 40,
      },
    },
  ];

  const createAnimation = useCallback(
    (transition = {}, aditionalStyles = {}, aditionalStylesStart = {}) => {
      return {
        initial: {
          x: 0,
          right: '-60%',
          ...aditionalStylesStart,
        },
        animated: {
          right: 0,
          transition: {
            type: 'spring',
            ...transition,
          },
          ...aditionalStyles,
        },
      };
    },
    [],
  );
  const chamomileFirstStep = {
    initial: { borderRadius: '50%', clipPath: 'circle(0px at 50% 50%)' },
    animated: {
      borderRadius: '0%',
      clipPath: 'circle(150px at 50% 50%)',
      transition: {
        delay: 1.6,
        ...thirdStepTransition,
        damping: 50,
        stiffness: 90,
      },
    },
  };

  return (
    <div className={styles.container} ref={container}>
      <InsightsAnimationUnit
        variants={createAnimation(
          {
            stiffness: 321,
            damping: 20,
          },
          { right: '-7%' },
          { top: '32%' },
        )}
        inView={isInView}
      >
        <ICONS.branchWithLeaves />
      </InsightsAnimationUnit>
      <InsightsAnimationUnit
        variants={createAnimation(
          {
            delay: 0.6,
            stiffness: 510,
            damping: 26,
          },
          { right: '-1%' },
          { top: '-2%' },
        )}
        inView={isInView}
      >
        <ICONS.branchWithFlower />
      </InsightsAnimationUnit>
      <InsightsAnimationUnit
        variants={createAnimation(
          { delay: 3.43, ...thirdStepTransition },
          {
            right: '288px',
            scale: 1.64,
          },
          {
            right: '288px',
            scale: 1,
            top: '38%',
            width: 'auto',
            height: 'auto',
          },
        )}
        inView={isInView}
      >
        <motion.div
          variants={chamomileFirstStep}
          initial="initial"
          animate={isInView ? 'animated' : 'initial'}
        >
          <ICONS.chamomile />
        </motion.div>
      </InsightsAnimationUnit>
      {valuesLeaves.map((unit, idx) => (
        <InsightsItem
          key={`leaf ${idx}`}
          unit={unit}
          animation={thirdStepTransition}
          inView={isInView}
        >
          <ICONS.insightsLeaves />
        </InsightsItem>
      ))}
      {valuesFlowers.map((unit, idx) => (
        <InsightsItem
          key={`flower ${idx}`}
          unit={unit}
          animation={thirdStepTransition}
          inView={isInView}
        >
          <ICONS.insightsFlower />
        </InsightsItem>
      ))}
    </div>
  );
};

export default InsightsAnimation;
