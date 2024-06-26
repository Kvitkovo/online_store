import React, { useRef } from 'react';
import styles from './ServiceUnit.module.scss';
import { ICONS } from '../../../../../components/ui-kit/icons';
import { motion, useInView } from 'framer-motion';

export default function ServiceUnit({ info }) {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: '-40% 0%' });

  const { id, title, description, shape, strokeShape } = info;
  const circleAnimation = {
    first: {
      initial: {
        scale: 0.9,
        opacity: 0,
        rotate: 0,
      },
      animated: {
        scale: 1,
        opacity: 1,
        rotate: -179,
        transition: {
          duration: 0.64,
          rotate: {
            type: 'spring',
            stiffness: 14.73,
            damping: 8.57,
            delay: 1.84,
          },
        },
      },
    },
    second: {
      initial: { scale: 0.9, opacity: 0 },
      animated: {
        scale: 1,
        opacity: [1, 0],
        transition: {
          delay: 0.25,
          duration: 0.54,
          ease: 'linear',
          opacity: {
            delay: 1.05,
          },
        },
      },
    },
  };
  const waveDelay = [1, 1.7, 2.4, 3.1, 3.8];
  const LotusFlower = {
    initial: {
      borderRadius: '50%',
      clipPath: 'circle(0px at 50% 50%)',
    },
    animated: {
      clipPath: 'circle(382px at 50% 50%)',
      transition: {
        delay: 0.9,
        type: 'spring',
        duration: 6,
      },
    },
  };
  const imageAnimation = {
    initial: {
      scale: 1,
    },
    animated: {
      clipPath: 'circle(382px at 50% 50%)',
      transition: {
        delay: 0.9,
        type: 'spring',
        duration: 6,
      },
    },
  };
  const filterAnimation = {
    initial: {
      floodOpacity: 0.26,
    },
    animated: {
      floodOpacity: 0,
      transition: { duration: 0.15 },
    },
  };
  const shapeAnimation = {
    initial: {
      scale: 0.9,
      opacity: 0,
    },
    animated: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.64, delay: 0.25 },
    },
  };

  return (
    <li className={styles.service} ref={container}>
      <div className={styles.service__textSide}>
        <h3 className={styles.service__title}>{title}</h3>
        <p className={styles.service__description}>{description}</p>
        {id === 1 && (
          <motion.div
            className={styles.lotus}
            variants={LotusFlower}
            initial="initial"
            animate={isInView ? 'animated' : 'initial'}
          >
            <ICONS.lotus />
          </motion.div>
        )}
      </div>
      <div className={styles.img}>
        <svg
          viewBox="0 0 570 577"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.shapedImage}
        >
          <defs>
            <pattern
              id={`imagePattern${id}`}
              x="0"
              y="0"
              width="100%"
              height="100%"
            >
              <motion.image
                href={`/images/about-us/service${id}.jpg`}
                x="0"
                y="0"
                width="100%"
                height="100%"
                variants={imageAnimation}
                initial="initial"
                style={{ originX: '50%', originY: '50%' }}
                animate={isInView ? 'animated' : 'initial'}
              />
            </pattern>
          </defs>
          <defs>
            <filter id="filter" x="0" y="0" width="100%" height="100%">
              <motion.feFlood
                floodColor="#6CC25E"
                result="color"
                variants={filterAnimation}
                initial="initial"
                animate={isInView ? 'animated' : 'initial'}
              />
              <feComposite
                in="color"
                in2="SourceAlpha"
                operator="in"
                result="comp"
              />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="comp" />
              </feMerge>
            </filter>
          </defs>
          {shape ? (
            <>
              <path
                fill={`url(#imagePattern${id})`}
                d={shape}
                fillRule="evenodd"
                clipRule="evenodd"
                filter={id === 1 ? 'url(#filter)' : ''}
              />
            </>
          ) : (
            <circle
              fill={`url(#imagePattern${id})`}
              cx="282.5"
              cy="282.5"
              r="282"
            />
          )}
        </svg>
        <motion.svg
          viewBox="0 0 612 620"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.img__stroke}
          transition={{ delayChildren: 0.25 }}
        >
          {strokeShape ? (
            <motion.path
              fillRule="evenodd"
              clipRule="evenodd"
              d={strokeShape}
              stroke="#6CC25E"
              strokeLinecap="round"
              strokeDasharray="36 36"
              variants={shapeAnimation}
              initial="initial"
              animate={isInView ? 'animated' : 'initial'}
            />
          ) : (
            <>
              <motion.circle
                cx="303.5"
                cy="303.5"
                r="303"
                id="myCircle"
                strokeLinecap="round"
                strokeDasharray="36 36"
              />
              <motion.use
                variants={
                  id === 3 ? circleAnimation.first : circleAnimation.second
                }
                href="#myCircle"
                stroke="#6CC25E"
                initial={'initial'}
                animate={isInView ? 'animated' : 'initial'}
              />
              {id === 4 && (
                <>
                  {waveDelay.map((delay, idx) => (
                    <motion.use
                      href="#myCircle"
                      stroke="#6CC25E"
                      key={delay}
                      initial={{ scale: idx === 0 ? 1 : 0.9 }}
                      animate={
                        isInView
                          ? {
                              scale: idx === 4 ? 1 : 1.2,
                              opacity: idx === 4 ? [0, 1] : [0, 1, 0],
                              transition: {
                                delay: delay,
                                duration: idx === 4 ? 0.8 : 1.6,
                                ease: 'linear',
                              },
                            }
                          : { scale: idx === 0 ? 1 : 0.9 }
                      }
                    />
                  ))}
                </>
              )}
            </>
          )}
        </motion.svg>
      </div>
    </li>
  );
}
