import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from './InputPrice.module.scss';
import { ICONS } from '../../../icons';

const InputPrice = () => {
  const [inputValues, setInputValues] = useState([99, 99999]);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSliderChange = (values) => {
    setInputValues(values);
  };

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <input
          type="text"
          className={styles.input}
          value={inputValues[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
        />
        <ICONS.dash />
        <input
          type="text"
          className={styles.input}
          value={inputValues[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
        />
      </div>

      <Slider
        className={styles.bot}
        min={99}
        max={99999}
        range
        value={inputValues}
        onChange={handleSliderChange}
        allowCross={false}
        trackStyle={[{ backgroundColor: '#00A000', borderRadius: 0 }]}
        railStyle={{ backgroundColor: '#DBDBDB', borderRadius: 0 }}
        handleStyle={[
          {
            width: '16px',
            height: '16px',
            backgroundColor: '#fff',
            border: '1px solid #E1C429',
            marginTop: '-6px',
            opacity: 1,
            boxShadow: 'none',
          },
          {
            width: '16px',
            height: '16px',
            backgroundColor: '#fff',
            border: '1px solid #E1C429',
            marginTop: '-6px',
            opacity: 1,
            boxShadow: 'none',
          },
        ]}
      />
    </div>
  );
};

export default InputPrice;
