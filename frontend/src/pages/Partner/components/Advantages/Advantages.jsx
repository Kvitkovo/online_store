import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ICONS } from '../../../../components/ui-kit/icons';
import styles from './Advantages.module.scss';
import data from '../../../../data/partnerData.json';

const AdvantagesAnimation = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedData, setSelectedData] = useState(data[0]);

  const handleRotate = () => {
    setRotation((state) => (state += 90));
  };

  useEffect(() => {
    const rotationIndex = Math.floor((rotation % 360) / 90);
    setSelectedData(data[rotationIndex]);
  }, [rotation]);

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.box}
        animate={{ rotate: rotation }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        {data.map(({ icon, classNames, id }, index) => {
          const IconComponent = ICONS[icon];
          const isActive = id === selectedData.id;
          return (
            <motion.button
              key={index}
              className={`${styles.button} ${styles[classNames]}`}
              onClick={() => handleRotate(index)}
              initial={{ scale: 0.8 }}
              animate={{
                scale: isActive ? 1.5 : 0.8,
                rotate: -rotation,
              }}
              transition={{ duration: 0.5 }}
            >
              <IconComponent />
            </motion.button>
          );
        })}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedData ? selectedData.title : 'empty'}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.content}
        >
          {selectedData ? (
            <div className={styles.text}>
              <h3 className={styles.title}>{selectedData.title}</h3>
              <p>{selectedData.description}</p>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdvantagesAnimation;
