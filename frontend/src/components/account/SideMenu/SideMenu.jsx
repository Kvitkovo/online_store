import React from 'react';
import styles from './SideMenu.module.scss';
import { ICONS } from '../../ui-kit/icons';

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
      <div className={styles.menuItem}>Мої замовлення</div>
      <div className={styles.menuItem}>Вихід</div>
    </div>
  );
};

export default SideMenu;
