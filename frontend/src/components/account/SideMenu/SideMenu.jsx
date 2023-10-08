import React, { useState } from 'react';
import styles from './SideMenu.module.scss';
import { NavLink } from 'react-router-dom';

const SideMenu = () => {
  const [active, setActive] = useState(true);

  return (
    <div className={styles.menuAccount}>
      <NavLink
        to="/account"
        className={active ? `${styles.active}` : `${styles.inactive}`}
        onClick={() => setActive(true)}
      >
        Контактні дані
      </NavLink>
      <NavLink
        to="/account/orders"
        className={!active ? `${styles.active}` : `${styles.inactive}`}
        onClick={() => setActive(false)}
      >
        Мої замовлення
      </NavLink>
      <NavLink to="/account/orders" className={styles.menuItem}>
        Вихід
      </NavLink>
    </div>
  );
};

export default SideMenu;
