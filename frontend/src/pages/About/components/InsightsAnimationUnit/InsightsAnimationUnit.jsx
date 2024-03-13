import React from 'react';
import styles from './InsightsAnimationUnit.module.scss';
import { motion } from 'framer-motion';

const InsightsAnimationUnit = ({ variants, children }) => {
  return (
    <motion.div
      className={styles.container}
      variants={variants}
      initial="initial"
      whileInView="animated"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default InsightsAnimationUnit;
