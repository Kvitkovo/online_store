import React, { useState } from 'react';
import { ICONS } from '../../icons';
import styles from './DropDown.module.scss';

const DropDown = ({ initualValue, options }) => {
  const [open, setOpen] = useState(false);
  const [choosenOptionIdx, setChoosenOptionIdx] = useState(initualValue);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleChange = (idx) => {
    setChoosenOptionIdx(idx);
  };

  return (
    <div>
      <div onClick={handleClick} className={styles.dropdown}>
        <div className={styles.dropdown__choosen}>
          <span>{options[choosenOptionIdx]}</span>
          {open ? (
            <ICONS.arrowUp className={styles.dropdown__icon} />
          ) : (
            <ICONS.showList className={styles.dropdown__icon} />
          )}
        </div>

        {open &&
          options.map((option, idx) =>
            idx === choosenOptionIdx ? null : (
              <div
                key={option}
                className={styles.dropdown__option}
                onClick={() => handleChange(idx)}
              >
                {option}
              </div>
            ),
          )}
      </div>
    </div>
  );
};

export default DropDown;
