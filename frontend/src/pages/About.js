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
      <div>
        <Button
          variant="primary"
          padding="padding-even"
          label="Каталог товарів"
          onClick={() => alert('clicked primary')}
        />
        <br />
        <Button
          variant="secondary"
          padding="padding-sm"
          label="Додати компонент"
          icon={<ICONS.addComponent />}
          onClick={() => alert('clicked add')}
        />
      </div>
      <br />
      <div>
        <Button
          variant="primary"
          padding="padding-sm"
          label="Додати у кошик"
          icon={<ICONS.toCart />}
          onClick={() => alert('clicked cart')}
        />
      </div>
      <br />
      <div>
        <Button
          variant="primary"
          padding="padding-bg"
          label="У кошику"
          icon={<ICONS.cartChecked />}
          onClick={() => alert('clicked added')}
        />
      </div>
      <br />
      <div>
        <Button
          variant="no-border"
          label="Додати до букету"
          icon={<ICONS.toBouquet />}
          onClick={() => alert('clicked bouquete')}
        />
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
