import React from 'react';
import IconButton from '../../../../ui-kit/components/IconButton';
import { ICONS } from '../../../../ui-kit/icons';

import styles from './CountBlock.module.scss';

const CountBlock = ({ count }) => {
  return (
    <div className={styles.countBlock}>
      <IconButton icon={<ICONS.dash />} />
      <div className={styles.field}>{count}</div>
      <IconButton icon={<ICONS.addComponent className={styles.icon} />} />
    </div>
  );
};

export default CountBlock;
