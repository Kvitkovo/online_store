import React from 'react';
import styles from './BlossomItem.module.scss';

const BlossomItem = ({ title, description }) => {
  return (
    <li className={styles.item}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </li>
  );
};

export default BlossomItem;
