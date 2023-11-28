import React, { useState } from 'react';
import { ICONS } from '../../icons';
import styles from './DropDown.module.scss';
import Button from '../Button';
import RadioButton from '../RadioButton';

const DropDown = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  const sortOptions = ['від дешевих до дорогих', 'від дорогих до дешевих'];
  const sortOptionsMobile = ['Дешеві', 'Дорогі'];

  const handleClick = () => {
    setOpen(!open);
  };
  const handleChange = (idx) => {
    setValue(idx);
  };

  return (
    <div>
      <div onClick={handleClick} className={styles.dropdown}>
        <div className={styles.dropdown__choosen}>
          <span>{sortOptions[value]}</span>
          {open ? (
            <ICONS.arrowUp className={styles.dropdown__icon} />
          ) : (
            <ICONS.showList className={styles.dropdown__icon} />
          )}
        </div>

        {open &&
          sortOptions.map((option, idx) =>
            idx === value ? null : (
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

      <div className={styles.dropdown__mobile}>
        <Button
          label={sortOptionsMobile[value]}
          variant={'secondary'}
          icon={<ICONS.sortIcon />}
          onClick={handleClick}
        />

        {open && (
          <div className={styles.sortOptions}>
            {sortOptionsMobile.map((option, idx) => (
              <RadioButton
                key={option}
                label={option}
                onChange={() => handleChange(idx)}
                value={idx}
                checked={value === idx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
