import React, { memo, useState } from 'react';
import { ICONS } from '../../icons';

const Checkbox = memo(({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <label>
      <input
        type="checkbox"
        style={{ display: 'none' }}
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
