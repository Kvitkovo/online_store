import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../../../ui-kit/icons';

export const ButtonBack = ({ to }) => {
  return (
    <NavLink to={to}>
      <button style={{ border: 'none', background: 'transparent' }}>
        <ICONS.back />
      </button>
    </NavLink>
  );
};

export default ButtonBack;
