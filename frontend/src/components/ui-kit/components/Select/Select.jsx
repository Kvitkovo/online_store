import React, { useState, memo } from 'react';
import styles from './Select.module.scss';

import { ICONS } from '../../icons';

const Select = memo(({ value, setValue, options }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (nextValue) => {
    setValue(nextValue);
    setOpen(false);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.root} onMouseLeave={handleMouseLeave}>
        <div className={styles.select} onClick={() => setOpen(!open)}>
          <span className={styles.label}>
            {options.find((option) => option.value === value)?.label}
          </span>
          {open ? <ICONS.arrowUp /> : <ICONS.showList />}
        </div>
        {open && (
          <div className={styles.option}>
            {options.map(
              (option) =>
                option.value !== value && (
                  <span
                    key={option.value}
                    className={styles.label}
                    onClick={() => handleChange(option.value)}
                  >
                    {option.label}
                  </span>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default Select;
