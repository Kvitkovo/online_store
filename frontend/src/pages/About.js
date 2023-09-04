import React, { useState } from 'react';
import { ICONS } from '../components/ui-kit/icons';
import Button from '../components/ui-kit/components/Button';
import Checkbox from '../components/ui-kit/components/Checkbox/Checkbox';
import Divider from '../components/ui-kit/components/Divider/Divider';
import Filter from '../components/ui-kit/components/Filter/Filter';

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
      <br />
      <Button
        variant="secondary"
        label="Додати компонент"
        padding="padding-sm"
        icon={<ICONS.addComponent />}
        onClick={() => alert('clicked add')}
      />
      <br />
      <Button
        variant="primary"
        label="Додати у кошик"
        padding="padding-sm"
        icon={<ICONS.toCart />}
        onClick={() => alert('clicked cart')}
      />
      <br />
      <Button
        variant="primary"
        label="У кошику"
        padding="padding-bg"
        icon={<ICONS.cartChecked />}
        onClick={() => alert('clicked added')}
      />
      <br />
      <Button
        variant="no-border"
        label="Додати до букету"
        icon={<ICONS.toBouquet />}
        onClick={() => alert('clicked bouquete')}
      />
      <br />
      <div>
        <Divider />
      </div>
      <br />
      <div>
        <Filter label="Троянди" />
        <Filter label="Троянди" />
        <Filter label="Троянди" />
      </div>
    </div>
  );
}
export default About;
