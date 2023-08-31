import React, { memo } from 'react';
import { ICONS } from '../../icons';
import styles from './Checkbox.module.scss';

const Checkbox = memo(({ label, checked, onChange }) => {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" id={label} checked={checked} onChange={onChange} />
      <div className={styles.icon}>
        {checked ? <ICONS.checkedBox /> : <ICONS.checkBox />}
      </div>
      <div className={styles.label}> {label} </div>
    </label>
  );
});

export default Checkbox;
