import React from 'react';
import styles from './InsightsAnimationUnit.module.scss';
import { motion } from 'framer-motion';

const InsightsAnimationUnit = ({ variants, inView, children }) => {
  return (
    <motion.div
      className={styles.container}
      variants={variants}
      initial="initial"
      animate={inView ? 'animated' : 'initial'}
    >
      {children}
    </motion.div>
  );
};

export default InsightsAnimationUnit;
