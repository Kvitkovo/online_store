import React, { memo } from 'react';
import { ICONS } from '../../icons';
import styles from './Filter.module.scss';
import IconButton from '../IconButton';

const Filter = memo(({ label, onClick, filterName, id }) => {
  const onReset = () => {
    onClick((prev) => {
      const resetedItem = [...prev[filterName]].map((item) => {
        if (item.id === id) {
          return { ...item, checked: false };
        } else {
          return item;
        }
      });
      return { ...prev, [filterName]: resetedItem };
    });
  };
  return (
    <div className={styles.filter}>
      <div className={styles.label}>{label}</div>
      <IconButton
        icon={<ICONS.CloseIcon className={styles.icon} />}
        onClick={onReset}
      />
    </div>
  );
});

export default Filter;
