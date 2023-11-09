import React from 'react';
import styles from './BurgerMenu.module.scss';
import { ICONS } from '../../../../ui-kit/icons';
import IconButton from '../../../../ui-kit/components/IconButton';

const ClosedMenu = ({
  toggleMenu,
  toggleCart,
  toggleMyBouquet,
  cartQuantity,
}) => {
  return (
    <div className={styles.burgerMenu}>
      <div className={styles.burgerHeader}>
        <div className={styles.burgerIcon} onClick={toggleMenu}>
          <IconButton icon={<ICONS.burgerMenu />} />
        </div>
        <div className={styles.actionIcons}>
          <div className={styles.search}>
            <IconButton icon={<ICONS.searchMobile />} />
          </div>
          <div className={styles.bouquet}>
            <IconButton
              icon={<ICONS.BouquetIcon />}
              onClick={toggleMyBouquet}
            />
          </div>
          <div className={styles.account}>
            <IconButton icon={<ICONS.halfPerson />} />
          </div>
          <div className={styles.cart}>
            <IconButton icon={<ICONS.CartIcon />} onClick={toggleCart} />
            {cartQuantity != 0 ? (
              <div className={styles.cartQuantity}>{cartQuantity}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedMenu;
