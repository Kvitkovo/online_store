import React, { useState } from 'react';
import InputPrice from '../components/ui-kit/components/Input/InputPrice';
import RangeSlider from '../components/ui-kit/components/RangeSlider';
import { ICONS } from '../components/ui-kit/icons';

import '../scss/Promotions.scss';

function Promotions() {
  //inputPrice
  const [inputValues, setInputValues] = useState([99, 99999]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const index = name === 'input1' ? 0 : 1;

    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSliderChange = (values) => {
    setInputValues(values);
  };
  return (
    <div>
      <div className="priceBlock">
        <div className="priceTop">
          <InputPrice
            value={inputValues[0]}
            handleInputChange={handleInputChange}
            index={0}
          />
          <ICONS.dash />
          <InputPrice
            value={inputValues[1]}
            handleInputChange={handleInputChange}
            index={1}
          />
        </div>
        <RangeSlider
          inputValues={inputValues}
          handleSliderChange={handleSliderChange}
        />
      </div>
    </div>
  );
}
export default Promotions;
