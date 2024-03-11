import React from 'react';
import styles from './Services.module.scss';
import { ICONS } from '../../../../components/ui-kit/icons';
import { motion } from 'framer-motion';

const Services = ({ data }) => {
  // const imgScaleDelay = 0.25;
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
        rotate: -90,
        transition: { duration: 0.64, rotate: { duration: 1, delay: 0.84 } },
      },
    },
    second: {
      initial: { scale: 0.9, opacity: 0.3 },
      animated: {
        scale: [0.9, 1.15],
        opacity: [0, 1, 0],
        transition: { repeat: 3, duration: 0.6 },
        transitionEnd: {
          opacity: 1,
          scale: 1,
        },
      },
    },
  };

  const textSlide = {
    initial: { marginTop: 0 },
    animated: {
      marginTop: [67, 0],
      transition: {
        delay: 0.25,
        ease: 'linear',
      },
    },
  };
  return (
    <ul className={styles.servicesList}>
      {data.map((service) => {
        const { id, title, description, shape, strokeShape } = service;
        return (
          <li className={styles.service} key={id}>
            <motion.div
              className={styles.service__textSide}
              variants={id === 3 ? textSlide : {}}
              initial="initial"
              whileInView="animated"
            >
              <h3 className={styles.service__title}>{title}</h3>
              <p className={styles.service__description}>{description}</p>
              {id === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.35, delay: 0.6 },
                  }}
                  viewport={{ once: true, margin: '-20% 0px' }}
                >
                  <ICONS.lotus />
                </motion.div>
              )}
            </motion.div>
            <motion.div className={styles.img}>
              <svg
                width="570"
                height="577"
                viewBox="0 0 570 577"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                      whileInView={{
                        scale: 1.1,
                        transition: { duration: 0.64 },
                      }}
                      viewport={{ once: true, margin: '-30% 0px' }}
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
                      viewport={{ once: true, margin: '-20% 0px' }}
                    />
                    {id === 4 && (
                      <motion.use
                        href="#myCircle"
                        stroke="#6CC25E"
                        variants={circleAnimation.second}
                        initial={'initial'}
                        whileInView={'animated'}
                      />
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
