import React, { useState, memo } from 'react';
import styles from './Select.module.scss';

import { ICONS } from '../../icons';

const Select = memo(({ value, setValue, options }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (nextValue) => {
    setValue(nextValue);
    setOpen(false);
  };
  return (
    <div className={styles.root}>
      <div className={styles.select} onClick={() => setOpen(!open)}>
        <span>{options.find((option) => option.value === value)?.label}</span>
        {open ? <ICONS.arrowUp /> : <ICONS.showList />}
      </div>
      {open && (
        <div className={styles.option}>
          {options.map(
            (option) =>
              option.value !== value && (
                <span
                  key={option.value}
                  onClick={() => handleChange(option.value)}
                >
                  {option.label}
                </span>
              ),
          )}
        </div>
      )}
    </div>
  );
});

export default Select;