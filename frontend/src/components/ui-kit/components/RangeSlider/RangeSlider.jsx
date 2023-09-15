import React, { memo } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from './RangeSlider.module.scss';

const RangeSlider = memo(({ inputValues, handleSliderChange }) => {
  return (
    <Slider
      className={styles.slider}
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
  );
});

export default RangeSlider;
