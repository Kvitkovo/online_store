import React, { memo } from 'react';

const Checkbox = memo(({ label, checked, onChange }) => {
  return (
    <label>
      <input type="checkbox" id={label} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
});

export default Checkbox;
