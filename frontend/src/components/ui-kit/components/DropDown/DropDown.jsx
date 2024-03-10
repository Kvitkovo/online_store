import React, { useState } from 'react';
import { ICONS } from '../../icons';
import styles from './DropDown.module.scss';
import Button from '../Button';
import RadioButton from '../RadioButton';

const DropDown = ({ sortValue, setValue, options }) => {
  const [open, setOpen] = useState(false);
  const label = options[sortValue].labelMobile;
  const handleClick = () => {
    setOpen(!open);
  };
  const handleChange = (value) => {
    setValue(value);
    setOpen(!open);
  };
  return (
    <>
      <Button
        label={label}
        variant={'secondary'}
        icon={<ICONS.sortIcon />}
        onClick={handleClick}
      />

      {open && (
        <div className={styles.sortOptions}>
          {options.map((option) => {
            const { value, labelMobile: label } = option;
            return (
              <RadioButton
                key={value}
                label={label}
                onChange={() => handleChange(value)}
                value={value}
                checked={value === sortValue}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default DropDown;
