import React, { memo } from 'react';
import styles from './InputPrice.module.scss';

const InputPrice = memo(({ value, handleInputChange, index }) => {
  const inputName = index === 0 ? 'input1' : 'input2';
  return (
    <input
      type="number"
      className={styles.input}
      name={inputName}
      value={value}
      onChange={handleInputChange}
    />
  );
});

export default InputPrice;
