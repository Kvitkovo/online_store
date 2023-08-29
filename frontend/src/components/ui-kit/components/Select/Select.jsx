import React, { useState } from 'react';
import styles from './Select.module.scss';

import { ICONS } from '../../icons';
import IconButton from '../IconButton';

const Select = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('fromCheapToExpensive');

  const options = {
    fromExpensiveToCheap: 'від дорогих до дешевих',
    fromCheapToExpensive: 'від дешевих до дорогих',
  };

  const handleChange = () => {
    const nextValue =
      value === 'fromCheapToExpensive'
        ? 'fromExpensiveToCheap'
        : 'fromCheapToExpensive';
    setValue(nextValue);
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.select} onClick={() => setOpen(!open)}>
        <span>{options[value]}</span>
        <IconButton icon={open ? <ICONS.arrowUp /> : <ICONS.showList />} />
      </div>
      {open && (
        <div className={styles.option} onClick={handleChange}>
          {Object.keys(options).map(
            (key) => key !== value && <span key={key}>{options[key]}</span>,
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
