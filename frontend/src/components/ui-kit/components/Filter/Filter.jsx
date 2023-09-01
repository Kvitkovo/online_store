import React, { memo } from 'react';
import { ICONS } from '../../icons';
import styles from './Filter.module.scss';
import IconButton from '../IconButton/IconButton';

const Filter = memo(({ label, onClick }) => {
  return (
    <div className={styles.filter}>
      <div className={styles.label}>{label}</div>{' '}
      <div className={styles.icon}>
        <IconButton icon={<ICONS.CloseIcon />} onClick={onClick} />
      </div>
    </div>
  );
});

export default Filter;
