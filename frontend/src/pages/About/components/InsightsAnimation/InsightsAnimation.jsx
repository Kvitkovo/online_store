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
    { rightPos: [475, 132], topPos: [-190, 223], rotate: -172, scaleY: -1 },
    { rightPos: [483, -63], topPos: [-32, 387], rotate: 0 },
    { rightPos: [563, 169], topPos: [67, 443], rotate: 0 },
    { rightPos: [406, 130], topPos: [166, 173], rotate: 75, scaleY: -1 },
  ];
  const valuesFlowers = [
    { rightPos: [371, 56], topPos: [-167, 265], rotate: 0 },
    {
      rightPos: [483, 48],
      topPos: [-115, 259],
      rotate: 20,
      scale: 0.745,
      scaleX: -1,
    },
    { rightPos: [563, -75], topPos: [-62, 293], rotate: -13, scaleX: -1 },
    { rightPos: [523, 12], topPos: [152, 337], rotate: -13, scaleX: -1 },
  ];

  const createAnimation = useCallback(
    (transition = {}, aditionalStyles = {}, aditionalStylesStart = {}) => {
      return {
        initial: {
          x: 0,
          right: '-100%',
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
          { x: 65 },
          { top: '31%' },
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
          { x: 10 },
          { top: '-2%' },
        )}
      >
        <ICONS.branchWithFlower />
      </InsightsAnimationUnit>
      <InsightsAnimationUnit
        variants={createAnimation(
          { delay: 2.42, ...thirdStepTransition },
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
              delay: 1.2,
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
