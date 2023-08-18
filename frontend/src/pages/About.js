import React from 'react';
import { iconAdd, iconCart, iconCheck } from '../components/ui-kit/icons';
import Button from '../components/ui-kit/components/Button/Button';

function About() {
  return (
    <div>
      <Button
        variant="secondary"
        label="Додати компонент"
        icon={iconAdd}
        onClick={() => alert('clicked add')}
      />
      <Button
        variant="primary"
        label="Додати у кошик"
        icon={iconCart}
        onClick={() => alert('clicked cart')}
      />
      <Button
        variant="primary"
        label="У кошику"
        icon={iconCheck}
        onClick={() => alert('clicked added')}
      />
    </div>
  );
}
export default About;
