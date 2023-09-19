import React from 'react';
import styles from './BurgerMenu.module.scss';
import { ICONS } from '../../../ui-kit/icons';

const ClosedMenu = ({ toggleMenu }) => {
  return (
    <div className={styles.burgerMenu}>
      <div className={styles.burgerHeader}>
        <div className={styles.burgerIcon} onClick={toggleMenu}>
          <ICONS.burgerMenu />
        </div>
        <div className={styles.actionIcons}>
          <div className={styles.search}>
            <ICONS.searchMobile />
          </div>
          <div className={styles.bouquet}>
            <ICONS.BouquetIcon />
          </div>
          <div className={styles.account}>
            <ICONS.halfPerson />
          </div>
          <div className={styles.cart}>
            <ICONS.CartIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedMenu;
