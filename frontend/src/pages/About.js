import React, { useState } from 'react';
import { ICONS } from '../components/ui-kit/icons';
import Button from '../components/ui-kit/components/Button';
import Checkbox from '../components/ui-kit/components/Checkbox/Checkbox';

function About() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <div>
        <Checkbox
          label="Акційна ціна"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <Button
        variant="secondary"
        label="Додати компонент"
        icon={<ICONS.addComponent />}
        onClick={() => alert('clicked add')}
      />
      <Button
        variant="primary"
        label="Додати у кошик"
        icon={<ICONS.toCart />}
        onClick={() => alert('clicked cart')}
      />

      <Button
        variant="primary"
        label="У кошику"
        icon={<ICONS.cartChecked />}
        onClick={() => alert('clicked added')}
      />
      <Button
        variant="no-border"
        label="Додати до букету"
        icon={<ICONS.toBouquet />}
        onClick={() => alert('clicked bouquete')}
      />
    </div>
  );
}
export default About;
