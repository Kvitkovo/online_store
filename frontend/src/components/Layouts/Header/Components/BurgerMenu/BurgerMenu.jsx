import React, { useState } from 'react';
/* import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';
import Divider from '../../../ui-kit/components/Divider';
import ROUTES from '../../../../constants/routers';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import { navigationItems } from '../navigationItems';
import IconButton from '../../../ui-kit/components/IconButton'; */
import OpenMenu from './OpenMenu';
import ClosedMenu from './ClosedMenu';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen ? (
        <OpenMenu toggleMenu={toggleMenu} />
      ) : (
        <ClosedMenu toggleMenu={toggleMenu} />
      )}
    </>
  );
  /*   const closeNavigation = () => {
    setIsOpen(false);
  }; */

  /* return (
    <>
      {isOpen ? (
        <div className={styles.openMenu}>
          <div className={styles.containerTop}>
            <NavLink to={ROUTES.home} className={styles.logoContainer}>
              <img className={styles.logo} src="images/logo.svg" />
              <ICONS.closeMobile onClick={closeNavigation} />
            </NavLink>
          </div>

          <div className={styles.menuItems}>
            <p className={`${styles.links} ${styles.catalogue}`}>
              {' '}
              <ICONS.mobileCatalogue className={styles.catalogueIcon} />
              <span>Каталог товарів</span>
            </p>
            <NavigationMenu items={navigationItems} menuType="BurgerMenu" />
            <div className={styles.divider}>
              <Divider />
            </div>
            <div>
              <a className={styles.phoneLink} href="tel:+380937777777">
                <IconButton
                  icon={<ICONS.phone />}
                  className={styles.phoneIcon}
                />
                (093) 777-77-77
              </a>
              <div className={styles.location}>
                <Button
                  variant="no-border"
                  label="Київ"
                  padding="padding-header-even"
                  reverse="true"
                  icon={<ICONS.location />}
                />
              </div>
            </div>
            <div className={styles.divider}>
              <Divider />
            </div>
            <p className={styles.addition}>
              {' '}
              <span className={styles.language}>Укр</span>{' '}
              <IconButton icon={<ICONS.person />} />
            </p>
          </div>
        </div>
      ) : (
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
      )}
    </>
  ); */
};

export default BurgerMenu;
