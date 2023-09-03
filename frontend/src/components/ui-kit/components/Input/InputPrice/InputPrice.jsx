import React, { memo } from 'react';
import styles from './InputPrice.module.scss';

const InputPrice = memo(({ value, handleInputChange, index }) => {
  return (
    <input
      type="number"
      className={styles.input}
      value={value}
      onChange={(e) => handleInputChange(index, e.target.value)}
    />
  );
});

export default InputPrice;
