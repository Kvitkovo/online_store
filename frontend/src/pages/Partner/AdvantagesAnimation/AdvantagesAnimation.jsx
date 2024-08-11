import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AdvantagesAnimation.module.scss';
import data from '../../../data/partnerData.json';
import IconButton from '../../../components/ui-kit/components/IconButton';
import { ICONS } from '../../../components/ui-kit/icons';

const AdvantagesAnimation = () => {
  const [activeId, setActiveId] = useState(0);
  const [rotation, setRotation] = useState(0);
  const { advantages } = data;
  const loop = {
    repeat: Infinity,
    repeatType: 'loop',
  };

  const handleChangeContent = (step) => {
    setActiveId((prev) => {
      if (
        (prev === 0 && step === -1) ||
        (prev === advantages.length - 1 && step === 1)
      ) {
        return prev;
      }
      return prev + step;
    });
    setRotation((prev) => prev - 90 * step);
  };

  const springTransitionPhone = {
    type: 'spring',
    mass: 1,
    stiffness: 2880,
    damping: 2.4,
    delay: 1,
    ...loop,
  };
  const springTransitionGears = {
    type: 'spring',
    mass: 1,
    stiffness: 11.25,
    damping: 7.5,
    delay: 1,
    ...loop,
  };
  const springTransitionMoney = {
    type: 'spring',
    stiffness: 80,
    damping: 20,
    delay: 1,
    ...loop,
    repeatDelay: 0.3,
  };
  const btnTransition = { delay: 1, type: 'linear', duration: 2.66, ...loop };

  return (
    <div className={styles.animated}>
      <motion.div
        className={styles.animated__container}
        initial={{ translate: '-40% -50%' }}
        animate={{ rotate: rotation }}
        transition={{ duration: 1, delay: 0.35 }}
      >
        <motion.div
          className={styles.icon}
          style={{ right: '-17%', top: '32%' }}
          animate={{ rotate: -rotation }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          <motion.div
            className={styles.icon__inner}
            animate={
              activeId === 0
                ? { scale: 2.2, transition: { delay: 1, duration: 0.3 } }
                : { scale: 1, transition: { duration: 0.3 } }
            }
            transition={{ delay: 1 }}
          >
            <ICONS.messageAnimation className={styles.icon__message} />

            <motion.div
              style={{ position: 'absolute', bottom: -6, right: 3 }}
              animate={
                activeId === 0
                  ? {
                      rotate: 4,
                      transition: springTransitionPhone,
                    }
                  : {}
              }
            >
              <ICONS.phoneAnimation className={styles.icon__phone} />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className={styles.icon}
          style={{ bottom: '-17%', left: '32%' }}
          animate={{ rotate: -rotation }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          <motion.div
            className={`${styles.icon__inner} ${styles.icon__inner_gears}`}
            animate={
              activeId === 1
                ? { scale: 2.2, transition: { delay: 1, duration: 0.3 } }
                : { scale: 1, transition: { duration: 0.3 } }
            }
            transition={{ delay: 1 }}
          >
            <motion.div
              style={{ position: 'absolute', top: 13, left: 9 }}
              className={styles.icon__goldGear}
              animate={
                activeId === 1
                  ? {
                      rotate: 180,
                      transition: springTransitionGears,
                    }
                  : {}
              }
            >
              <ICONS.goldGear />
            </motion.div>
            <ICONS.dollar className={styles.icon__dollar} />

            <motion.div
              style={{ position: 'absolute', top: 27, right: 9 }}
              className={styles.icon__blueGear}
              animate={
                activeId === 1
                  ? {
                      rotate: -180,
                      transition: springTransitionGears,
                    }
                  : {}
              }
            >
              <ICONS.blueGear />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className={styles.icon}
          style={{ left: '-17%', top: '32%' }}
          animate={{ rotate: -rotation }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          <motion.div
            className={`${styles.icon__inner} ${styles.icon__inner_money}`}
            animate={
              activeId === 2
                ? { scale: 2.2, transition: { delay: 1, duration: 0.3 } }
                : { scale: 1, transition: { duration: 0.3 } }
            }
            transition={{ delay: 1 }}
          >
            <div className={styles.icon__money}>
              <ICONS.money />
            </div>

            <motion.div
              className={styles.icon__repeat}
              animate={
                activeId === 2
                  ? {
                      transformOrigin: '29.5 29.5',
                      rotate: -180,
                      transition: springTransitionMoney,
                    }
                  : {}
              }
            >
              <ICONS.repeat />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className={styles.icon}
          style={{ top: '-17%', left: '32%' }}
          animate={{ rotate: -rotation }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          <motion.div
            className={styles.icon__inner}
            animate={
              activeId === 3
                ? { scale: 2.2, transition: { delay: 1, duration: 0.3 } }
                : { scale: 1, transition: { duration: 0.3 } }
            }
            transition={{ delay: 1 }}
          >
            <motion.div
              initial={{ width: 65, height: 25 }}
              animate={
                activeId === 3
                  ? {
                      width: [0, 65],
                      transformOrigin: '0 50%',
                      transition: {
                        delay: 1,
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'loop',
                      },
                    }
                  : {}
              }
              style={{ position: 'absolute', top: -14 }}
            >
              <ICONS.arrowAnimated
                initial={{ scale: 0 }}
                className={styles.icon__arrow}
              />
            </motion.div>

            <ICONS.coins className={styles.icon__coins} />
          </motion.div>
        </motion.div>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.animated__content}
        >
          <div className={activeId === 0 ? styles.hidden : ''}>
            <IconButton
              icon={<ICONS.prevButton />}
              onClick={() => handleChangeContent(-1)}
            />
          </div>
          <div className={styles.animated__text}>
            <h3 className={styles.animated__title}>
              {advantages[activeId].title}
            </h3>
            <p className={styles.animated__desc}>
              {advantages[activeId].description}
            </p>
          </div>
          <div
            className={
              activeId === advantages.length - 1 ? styles.hidden : styles.btn
            }
          >
            {activeId === 0 && (
              <motion.div
                className={styles.shade}
                // initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.3],
                  repeatCount: Infinity,
                  delay: 0.2,
                }}
                transition={btnTransition}
              >
                <ICONS.nextHighlighted />
              </motion.div>
            )}
            <motion.div
              animate={
                activeId === 0
                  ? {
                      scale: 1.3,
                    }
                  : { scale: 1 }
              }
              transition={btnTransition}
            >
              <IconButton
                icon={<ICONS.nextButton />}
                onClick={() => handleChangeContent(1)}
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdvantagesAnimation;
