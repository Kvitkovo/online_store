import React from 'react';
import styles from './BurgerMenu.module.scss';
import { NavLink } from 'react-router-dom';
import Button from '../../../../ui-kit/components/Button';
import { ICONS } from '../../../../ui-kit/icons';
import Divider from '../../../../ui-kit/components/Divider';
import ROUTES from '../../../../../constants/routers';
import IconButton from '../../../../ui-kit/components/IconButton';
import { navigationItems } from '../../../Header/navigationItems';
import NavigationMenu from '../NavigationMenu';

const OpenMenu = ({ toggleMenu }) => {
  return (
    <div className={styles.openMenu}>
      <div className={styles.containerTop}>
        <NavLink to={ROUTES.home}>
          <img className={styles.logo} src="images/logo.svg" />
        </NavLink>
        <div>
          <IconButton icon={<ICONS.closeMobile />} onClick={toggleMenu} />
        </div>
      </div>
      <div className={styles.menuItems}>
        <div className={`${styles.links} ${styles.catalogue}`}>
          <Button
            variant="bg-inherit"
            label="Каталог товарів"
            padding="padding-header-even"
            reverse="true"
            icon={<ICONS.mobileCatalogue />}
            onClick={() => alert('clicked bouquete')}
          />
        </div>
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
        </p>
      </div>
    </div>
  );
};

export default OpenMenu;
