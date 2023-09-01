import React, { memo } from 'react';
import { ICONS } from '../../icons';
import styles from './Filter.module.scss';

const Filter = memo(({ label, onClick }) => {
  return (
    <div className={styles.filter} onClick={onClick}>
      <div className={styles.label}>{label}</div>{' '}
      <div className={styles.icon}>{<ICONS.removeSelection />}</div>
    </div>
  );
});

export default Filter;
