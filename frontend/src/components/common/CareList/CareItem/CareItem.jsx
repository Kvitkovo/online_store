import React from 'react';
import styles from './CareItem.module.scss';
import { motion } from 'framer-motion';

export default function CareItem({ item, setSelected, selected }) {
  const isOpen = selected.includes(item.id);
  const toggle = (id) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  return (
    <motion.li
      className={`${styles.wrapper} ${isOpen ? styles.open : styles.closed}`}
      onClick={() => toggle(item.id)}
      animate={{ height: '100%' }}
      transition={{ duration: 2 }}
    >
      <motion.div
        className={styles.numberWrapper}
        initial={{ width: 57, height: 57 }}
        animate={
          isOpen
            ? { width: '100%', height: '100%' }
            : {
                width: 57,
                height: 57,
                transition: { width: { delay: 0.3 }, duration: 0.3 },
              }
        }
      >
        <span className={styles.number}>{item.id}</span>
      </motion.div>
      <motion.div
        className={styles.titleWrapper}
        animate={isOpen ? { textDecorationColor: 'transparent' } : {}}
      >
        <h3 className={styles.title}>{item.title}</h3>
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
        {item.content}
      </motion.p>
    </motion.li>
  );
}
