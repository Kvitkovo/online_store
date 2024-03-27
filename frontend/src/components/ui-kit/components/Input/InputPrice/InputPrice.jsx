import React, { memo, useEffect, useMemo, useState } from 'react';
import styles from './InputPrice.module.scss';

const InputPrice = memo(
  ({ value, handleInputChange, index, minValue, maxValue }) => {
    const [price, setPrice] = useState(0);
    const inputName = useMemo(
      () => (index === 0 ? 'input1' : 'input2'),
      [index],
    );

    const handleBlur = (e) => {
      const { value } = e.target;

      handleInputChange(value);
      if (
        (index === 0 && value < minValue) ||
        (index === 1 && value < minValue)
      ) {
        setPrice(minValue);
        handleInputChange(minValue);
      }
      if (
        (index === 1 && value > maxValue) ||
        (index === 0 && value > maxValue)
      ) {
        setPrice(maxValue);
        handleInputChange(maxValue);
      }
    };
    useEffect(() => {
      setPrice(value);
    }, [value]);

    return (
      <input
        type="number"
        className={styles.input}
        name={inputName}
        value={price}
        min={minValue}
        max={maxValue}
        onChange={(e) => setPrice(Math.abs(e.target.value))}
        onBlur={handleBlur}
      />
    );
  },
);

export default InputPrice;
