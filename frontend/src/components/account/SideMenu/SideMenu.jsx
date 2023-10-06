import React from 'react';
import styles from './SideMenu.module.scss';
import { ICONS } from '../../ui-kit/icons';
import { NavLink } from 'react-router-dom';

const SideMenu = () => {
  return (
    <div className={styles.menuAccount}>
      <div className={styles.account}>
        <div className={styles.accountIcon}>
          {' '}
          <ICONS.account />
        </div>
        <div className={styles.name}>Шевченко Олена Олегівна</div>
      </div>
      <NavLink to="/account" className={styles.menuItem}>
        Контактні дані
      </NavLink>
      <NavLink to="/account/orders" className={styles.menuItem}>
        Мої замовлення
      </NavLink>
      <div className={styles.menuItem}>Вихід</div>
    </div>
  );
};

export default SideMenu;
