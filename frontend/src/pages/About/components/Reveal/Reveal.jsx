import React from 'react';
import { motion } from 'framer-motion';

const Reveal = ({ children, animationName }) => {
  const variants = {
    main: {
      initial: {},
      animated: {},
    },
  };
  return <motion.div variants={variants[animationName]}>{children}</motion.div>;
};

export default Reveal;
