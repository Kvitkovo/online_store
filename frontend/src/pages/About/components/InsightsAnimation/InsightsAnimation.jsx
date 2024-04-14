import React, { useCallback } from 'react';
import { ICONS } from '../../../../components/ui-kit/icons';
import InsightsAnimationUnit from '../InsightsAnimationUnit';
import styles from './InsightsAnimation.module.scss';
import { motion } from 'framer-motion';
import InsightsItem from './InsightsItem';
const InsightsAnimation = () => {
  const thirdStepTransition = {
    type: 'spring',
    stiffness: 80,
    damping: 20,
    mass: 1,
  };
  const valuesLeaves = [
    { rightPos: [371, 236], topPos: [10, 13], rotate: 186, scaleY: -1 },
    { rightPos: [379, 42], topPos: [168, 219], rotate: 0 },
    { rightPos: [458, 169], topPos: [267, 274], rotate: 0 },
    { rightPos: [310, 235], topPos: [366, -27], rotate: 75, scaleY: -1 },
  ];
  const valuesFlowers = [
    { rightPos: [264, 163], topPos: [26, 72], rotate: 0 },
    {
      rightPos: [368, 163],
      topPos: [88, 53],
      rotate: 20,
      scale: 0.745,
      scaleX: -1,
    },
    { rightPos: [450, 32], topPos: [137, 94], rotate: -13, scaleX: -1 },
    { rightPos: [413, 90], topPos: [351, 138], rotate: -13, scaleX: -1 },
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

  return (
    <div className={styles.container}>
      <InsightsAnimationUnit
        variants={createAnimation(
          {
            stiffness: 321,
            damping: 20,
          },
          { right: '-7%' },
          { top: '32%' },
        )}
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
      >
        <ICONS.branchWithFlower />
      </InsightsAnimationUnit>
      <InsightsAnimationUnit
        variants={createAnimation(
          { delay: 3.63, ...thirdStepTransition },
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
      >
        <motion.div
          initial={{ borderRadius: '50%', clipPath: 'circle(0px at 50% 50%)' }}
          whileInView={{
            borderRadius: '0%',
            clipPath: 'circle(150px at 50% 50%)',
            transition: {
              delay: 1.4,
              ...thirdStepTransition,
            },
          }}
          viewport={{ once: true }}
        >
          <ICONS.chamomile />
        </motion.div>
      </InsightsAnimationUnit>
      {valuesLeaves.map((unit, idx) => (
        <InsightsItem
          key={`leaf ${idx}`}
          unit={unit}
          animation={thirdStepTransition}
        >
          <ICONS.insightsLeaves />
        </InsightsItem>
      ))}
      {valuesFlowers.map((unit, idx) => (
        <InsightsItem
          key={`flower ${idx}`}
          unit={unit}
          animation={thirdStepTransition}
        >
          <ICONS.insightsFlower />
        </InsightsItem>
      ))}
    </div>
  );
};

export default InsightsAnimation;
