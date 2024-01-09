import React, { memo } from 'react';
import { ICONS } from '../../icons';
import styles from './Filter.module.scss';
import IconButton from '../IconButton';

const Filter = memo(({ label, onClick, filterName, id }) => {
  return (
    <div className={styles.filter}>
      <div className={styles.label}>{label}</div>
      <IconButton
        icon={<ICONS.CloseIcon className={styles.icon} />}
        onClick={() => onClick(filterName, id)}
      />
    </div>
  );
});

export default Filter;
