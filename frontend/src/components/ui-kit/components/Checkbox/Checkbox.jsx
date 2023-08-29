import React, { memo, useState } from 'react';
import { ICONS } from '../../icons';
import styles from './Checkbox.module.scss';

const Checkbox = memo(({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        id={label}
        checked={checked}
        onChange={handleChange}
      />
      <div>{checked ? <ICONS.checkedBox /> : <ICONS.checkBox />}</div>
      {label}
    </label>
  );
});

export default Checkbox;
