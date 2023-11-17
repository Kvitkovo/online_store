import React, { useState } from 'react';
import { ICONS } from '../components/ui-kit/icons';
import Button from '../components/ui-kit/components/Button';
import Checkbox from '../components/ui-kit/components/Checkbox/Checkbox';
import Divider from '../components/ui-kit/components/Divider/Divider';
import Filter from '../components/ui-kit/components/Filter/Filter';
/* eslint-disable max-len */
import ResentLink from '../components/common/LoginBtn/ConfirmationModals/ResentLink';

function About() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <ResentLink />
      <Checkbox
        label="Акційна ціна"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <br />
      <Button
        variant="primary"
        label="Каталог товарів"
        padding="padding-even"
        onClick={() => alert('clicked primary')}
      />
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
        padding="padding-header-sm"
        reverse="true"
        icon={<ICONS.toBouquet />}
        onClick={() => alert('clicked bouquete')}
      />
      <br />
      <Button
        variant="no-border"
        label="Зібрати букет"
        padding="padding-header-sm"
        icon={<ICONS.toBouquet />}
        onClick={() => alert('clicked bouquete')}
      />
      <Button
        variant="no-border"
        label="Увійти"
        padding="padding-header-even"
        icon={<ICONS.halfPerson />}
        onClick={() => alert('clicked bouquete')}
      />
      <Button
        variant="no-border"
        label="(093) 777-77-77"
        padding="padding-header-even"
        reverse="true"
        icon={<ICONS.phone />}
        onClick={() => alert('clicked bouquete')}
      />
      <Button
        variant="no-border"
        label="Київ"
        padding="padding-header-even"
        reverse="true"
        icon={<ICONS.location />}
        onClick={() => alert('clicked bouquete')}
      />
      <Divider />
      <br />
      <Filter label="Троянди" />
      <Filter label="Троянди" />
      <Filter label="Троянди" />
    </div>
  );
}
export default About;
