import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import Button from '../../../../ui-kit/components/Button';
import { ICONS } from '../../../../ui-kit/icons';
import Divider from '../../../../ui-kit/components/Divider';
import ROUTES from '../../../../../constants/routers';
import IconButton from '../../../../ui-kit/components/IconButton';
import NavigationMenu from '../NavigationMenu';
import { navigationItems } from '../../navigationItems';

const OpenMenu = ({ toggleMenu }) => {
  return (
    <div className={styles.openMenu}>
      <NavLink to={ROUTES.home} className={styles.containerTop}>
        <img className={styles.logo} src="images/logo.svg" />
        <IconButton icon={<ICONS.closeMobile />} onClick={toggleMenu} />
      </NavLink>

      <div className={styles.menuItems}>
        <button className={`${styles.links} ${styles.catalogue}`}>
          {' '}
          <IconButton
            icon={<ICONS.mobileCatalogue className={styles.catalogueIcon} />}
          />
          <span>Каталог товарів</span>
        </button>
        <NavigationMenu items={navigationItems} menuType="BurgerMenu" />
        <div className={styles.divider}>
          <Divider />
        </div>
        <div>
          <a className={styles.phoneLink} href="tel:+380937777777">
            <ICONS.phone className={styles.phoneIcon} />
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
  );
};

export default OpenMenu;
