import React from 'react';
import styles from './SideMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';

const SideMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.menuAccount}>
      <NavLink
        to="/account"
        className={({ isActive }) =>
          isActive ? `${styles.active}` : `${styles.inactive}`
        }
        end
      >
        Контактні дані
      </NavLink>
      <NavLink
        to="/account/orders"
        className={({ isActive }) =>
          isActive ? `${styles.active}` : `${styles.inactive}`
        }
      >
        Мої замовлення
      </NavLink>
      <NavLink to="/" className={styles.menuItem} onClick={handleLogout}>
        Вихід
      </NavLink>
    </div>
  );
};

export default SideMenu;
