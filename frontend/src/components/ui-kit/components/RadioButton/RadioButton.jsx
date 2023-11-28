import React, { memo } from 'react';
import { ICONS } from '../../icons';
import styles from './RadioButton.module.scss';

const RadioButton = memo(({ label, checked, onChange, value }) => {
  return (
    <label className={styles.radio}>
      <input
        type="radio"
        id={label}
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <div className={styles.label}> {label} </div>
      <div className={styles.icon}>
        {checked ? <ICONS.radiobtnChecked /> : <ICONS.radiobtn />}
      </div>
    </label>
  );
});

export default RadioButton;
