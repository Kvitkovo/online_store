import React from 'react';
import styles from './SideMenu.module.scss';
import { NavLink } from 'react-router-dom';

const SideMenu = () => {
  return (
    <div className={styles.menuAccount}>
      <NavLink to="/account" className={styles.menuItem}>
        Контактні дані
      </NavLink>
      <NavLink to="/account/orders" className={styles.menuItem}>
        Мої замовлення
      </NavLink>
      <hr />
      <NavLink to="/account/orders" className={styles.menuItem}>
        Вихід
      </NavLink>
    </div>
  );
};

export default SideMenu;
