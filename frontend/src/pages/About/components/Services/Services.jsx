import React from 'react';
import styles from './Services.module.scss';
import { ICONS } from '../../../../components/ui-kit/icons';
import { motion } from 'framer-motion';

const Services = ({ data }) => {
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
            delay: 0.84,
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

  return (
    <ul className={styles.servicesList}>
      {data.map((service) => {
        const { id, title, description, shape, strokeShape } = service;
        return (
          <li className={styles.service} key={id}>
            <div className={styles.service__textSide}>
              <h3 className={styles.service__title}>{title}</h3>
              <p className={styles.service__description}>{description}</p>
              {id === 1 && (
                <motion.div
                  className={styles.lotus}
                  initial={{
                    borderRadius: '50%',
                    clipPath: 'circle(0px at 50% 50%)',
                  }}
                  whileInView={{
                    borderRadius: '0%',
                    clipPath: 'circle(382px at 50% 50%)',
                    transition: {
                      delay: 0.9,
                      type: 'spring',
                      duration: 6,
                    },
                  }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                >
                  <ICONS.lotus />
                </motion.div>
              )}
            </div>
            <motion.div className={styles.img}>
              <svg
                width="570"
                height="577"
                viewBox="0 0 570 577"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'relative', zIndex: 2 }}
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
                      initial={{ scale: 1 }}
                      style={{ originX: '50%', originY: '50%' }}
                      whileInView={{
                        scale: 1.1,
                        transition: {
                          duration: 0.64,
                          delay: 0.25,
                        },
                      }}
                      viewport={{ once: true, margin: '0px 0px -30%' }}
                    />
                  </pattern>
                </defs>
                <defs>
                  <filter id="filter" x="0" y="0" width="100%" height="100%">
                    <motion.feFlood
                      floodColor="#6CC25E"
                      result="color"
                      initial={{ floodOpacity: 0.26 }}
                      whileInView={{
                        floodOpacity: 0,
                        transition: { duration: 0.15 },
                      }}
                      viewport={{ once: true, margin: '0% 0px -20%' }}
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
                width="612"
                height="620"
                viewBox="0 0 612 620"
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
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{
                      scale: 1,
                      opacity: 1,
                      transition: { duration: 0.64, delay: 0.25 },
                    }}
                    viewport={{ once: true, margin: '-20% 0px' }}
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
                        id === 3
                          ? circleAnimation.first
                          : circleAnimation.second
                      }
                      href="#myCircle"
                      stroke="#6CC25E"
                      initial={'initial'}
                      whileInView={'animated'}
                      viewport={{ once: true }}
                    />
                    {id === 4 && (
                      <>
                        {waveDelay.map((delay, idx) => (
                          <motion.use
                            href="#myCircle"
                            stroke="#6CC25E"
                            key={delay}
                            initial={{ scale: idx === 0 ? 1 : 0.9 }}
                            whileInView={{
                              scale: idx === 4 ? 1 : 1.2,
                              opacity: idx === 4 ? [0, 1] : [0, 1, 0],
                              transition: {
                                delay: delay,
                                duration: idx === 4 ? 0.8 : 1.6,
                                ease: 'linear',
                              },
                            }}
                            viewport={{ once: true }}
                          />
                        ))}
                      </>
                    )}
                  </>
                )}
              </motion.svg>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
};

export default Services;
