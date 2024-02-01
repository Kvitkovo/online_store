import React, { useState } from 'react';
import styles from './BurgerMenu.module.scss';
import { ICONS } from '../../../../ui-kit/icons';
import IconButton from '../../../../ui-kit/components/IconButton';
import InputSearch from '../../../../ui-kit/components/Input/InputSearch';

const ClosedMenu = ({
  toggleMenu,
  toggleCart,
  toggleMyBouquet,
  cartQuantity,
  toggleLogin,
}) => {
  const [isSearchActive, setSearchActive] = useState(false);

  const toggleSearch = () => {
    setSearchActive((prev) => !prev);
  };
  return (
    <div className={styles.burgerMenu}>
      <div className={styles.burgerHeader}>
        <div className={styles.burgerIcon} onClick={toggleMenu}>
          <IconButton icon={<ICONS.burgerMenu />} />
        </div>
        <div
          className={`${styles.searchField} ${
            isSearchActive ? styles.visible : ''
          }`}
        >
          <InputSearch isActive={isSearchActive} setActive={setSearchActive} />
        </div>
        <div className={styles.actionIcons}>
          <div className={styles.searchMobile}>
            <IconButton icon={<ICONS.searchMobile />} onClick={toggleSearch} />
          </div>
          <div className={styles.bouquet}>
            <IconButton
              icon={<ICONS.BouquetIcon />}
              onClick={toggleMyBouquet}
            />
          </div>
          <div className={styles.account}>
            <IconButton icon={<ICONS.halfPerson />} onClick={toggleLogin} />
          </div>
          <div className={styles.cart}>
            <IconButton icon={<ICONS.CartIcon />} onClick={toggleCart} />
            {cartQuantity !== 0 ? (
              <div className={styles.cartQuantity}>{cartQuantity}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedMenu;
