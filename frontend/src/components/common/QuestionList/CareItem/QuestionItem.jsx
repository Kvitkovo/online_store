import React, { useRef, useState } from 'react';
import styles from './QuestionItem.module.scss';
import { motion } from 'framer-motion';

const CareItem = ({ item, setSelected, selected, customIcon }) => {
  const isOpen = selected.includes(item.id);
  const [animationComplete, setAnimationComplete] = useState(true);
  const ref = useRef(null);
  const toggle = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id],
    );
  };
  const handleAnimationStart = () => {
    if (isOpen) {
      setAnimationComplete(false);
      ref.current.addEventListener('transitionend', handleTransitionEnd);
    }
    ref.current.addEventListener('transitionend', handleTransitionEnd);
  };

  const handleTransitionEnd = () => {
    ref.current.removeEventListener('transitionend', handleTransitionEnd);
    setAnimationComplete(true);
  };

  return (
    <motion.li
      className={`${styles.wrapper} ${
        !isOpen && animationComplete ? styles.closed : styles.open
      }`}
      onClick={() => !isOpen && toggle(item.id)}
      animate={{ height: '100%' }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className={styles.titleWrapper}
        animate={isOpen ? { textDecorationColor: 'rgba(108, 194, 94, 0)' } : {}}
        transition={{ duration: 1 }}
      >
        <h3 className={styles.title}>{item.title}</h3>
      </motion.div>
      <motion.div
        ref={ref}
        className={styles.numberWrapper}
        initial={{ width: 57, height: 57 }}
        animate={
          isOpen
            ? {
                width: '100%',
                height: '100%',
                transition: { height: { duration: 0.85 }, duration: 0.7 },
              }
            : {
                width: 57,
                height: 57,
                transition: { width: { delay: 0.3 }, duration: 0.3 },
              }
        }
        onAnimationStart={handleAnimationStart}
      >
        <span className={styles.number}>{customIcon || item.id}</span>
      </motion.div>
      <motion.p
        initial={{ display: 'none', height: 0 }}
        animate={
          isOpen
            ? {
                display: 'block',
                height: '100%',
                opacity: 1,
                transition: { opacity: { delay: 0.9, duration: 0.2 } },
              }
            : {
                height: 0,
                opacity: 0,
                transition: { height: { delay: 1, duration: 0.4 } },
                transitionEnd: { display: 'none' },
              }
        }
        className={styles.content}
      >
        {item.content.split('\n').map((text, index) => (
          <span
            key={index}
            className={text.trim().startsWith('-') ? styles.indent : ''}
          >
            {text}
            <br />
          </span>
        ))}
        <span className={styles.hideBtn} onClick={() => toggle(item.id)}>
          Згорнути
        </span>
      </motion.p>
    </motion.li>
  );
};

export default CareItem;
