import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationMenu.module.scss';

const NavigationMenu = ({ items, menuType }) => {
  const navClassName = useMemo(() => {
    return menuType === 'Header' ? styles.headerNav : styles.burgerNav;
  }, [menuType]);
  return (
    <ul className={navClassName}>
      {items.map((item) => (
        <li key={item.label}>
          <NavLink className={styles.links} to={item.to}>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenu;
