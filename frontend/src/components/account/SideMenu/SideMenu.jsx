import React from 'react';
import styles from './SideMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';

const SideMenu = ({ onCloseMobileMenu }) => {
  const dispatch = useDispatch();

  const userLogout = () => {
    const itemsToRemove = ['authToken', 'authId', 'userfetchedData', 'email'];
    itemsToRemove.forEach((item) => localStorage.removeItem(item));
    dispatch(logout());
  };
  return (
    <div className={styles.menuAccount}>
      <NavLink
        to="/account"
        onClick={onCloseMobileMenu}
        className={({ isActive }) =>
          isActive ? `${styles.active}` : `${styles.inactive}`
        }
        end
      >
        Контактні дані
      </NavLink>
      <NavLink
        to="/account/orders"
        onClick={onCloseMobileMenu}
        className={({ isActive }) =>
          isActive ? `${styles.active}` : `${styles.inactive}`
        }
      >
        Мої замовлення
      </NavLink>
      <NavLink to="/" className={styles.menuItem} onClick={userLogout}>
        Вихід
      </NavLink>
    </div>
  );
};

export default SideMenu;
