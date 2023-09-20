import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationMenu.module.scss';

const NavigationMenu = ({ items, menuType }) => {
  const navClassName =
    menuType === 'Header' ? styles.headerNav : styles.burgerNav;
  return (
    <ul className={navClassName}>
      {items.map((item, index) => (
        <li key={index}>
          <NavLink
            className={`${styles.links} ${
              item.label === 'Акції' ? styles.promotions : ''
            }`}
            to={item.to}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenu;
