import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import styles from './Header.module.scss';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';
import InputSearch from '../../../ui-kit/components/Input/InputSearch';
import ROUTES from '../../../../constants/routers';
import IconButton from '../../../ui-kit/components/IconButton';
import { navigationItems } from '../navigationItems';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

const Header = () => {
  const [sticky, setSticky] = useState(false);

  window.onscroll = () => {
    if (window.scrollY > 70) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  return (
    <div>
      <BurgerMenu />
      <header>
        <div className={styles.containerTop}>
          {' '}
          <NavLink className={styles.logoLink} to={ROUTES.home}>
            <img
              className={styles.logo}
              src="images/logo.svg"
              alt="логотип магазину 'Квітково'"
            />
          </NavLink>
          <div className={styles.contacts}>
            <div className={styles.location}>
              <Button
                variant="no-border"
                label="Київ"
                padding="padding-header-even"
                reverse="true"
                icon={<ICONS.location />}
              />
            </div>
            <a className={styles.phoneLink} href="tel:+380937777777">
              <IconButton icon={<ICONS.phone />} className={styles.phoneIcon} />
              (093) 777-77-77
            </a>
          </div>
          <NavigationMenu items={navigationItems} menuType="Header" />
          <span className={styles.verticalLine}></span>
          <li className={styles.accessIcon}>
            <IconButton icon={<ICONS.person />} />
          </li>
          <button className={styles.btnLanguage}>Укр</button>
        </div>

        <div
          className={`${styles.containerBottom} ${sticky ? styles.sticky : ''}`}
        >
          <div className={styles.btnCatalogue}>
            <Button
              variant="primary"
              padding="padding-even"
              label="Каталог товарів"
              onClick={() => alert('clicked primary')}
            />
          </div>

          <div className={styles.searchField}>
            <InputSearch />
          </div>
          <div className={styles.action}>
            <Button
              variant="no-border"
              label="Зібрати букет"
              padding="padding-header-sm"
              icon={<ICONS.toBouquet />}
              onClick={() => alert('clicked bouquete')}
            />
            <div className={styles.login}>
              <Button
                variant="no-border"
                label="Увійти"
                padding="padding-header-even"
                icon={<ICONS.halfPerson />}
                onClick={() => alert('clicked bouquete')}
              />
            </div>

            <div className={styles.cart}>
              <IconButton icon={<ICONS.CartIcon />} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
