import React, { memo, useMemo } from 'react';
import styles from './InputPrice.module.scss';

const InputPrice = memo(
  ({ value, handleInputChange, index, minValue, maxValue }) => {
    const inputName = useMemo(
      () => (index === 0 ? 'input1' : 'input2'),
      [index],
    );
    return (
      <input
        type="number"
        className={styles.input}
        name={inputName}
        value={value}
        min={minValue}
        max={maxValue}
        onChange={handleInputChange}
      />
    );
  },
);

export default InputPrice;
