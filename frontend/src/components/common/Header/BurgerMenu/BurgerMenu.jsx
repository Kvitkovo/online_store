import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';
import Divider from '../../../ui-kit/components/Divider';
import ROUTES from '../../../constants/routers';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeNavigation = () => {
    setIsOpen(false);
  };

  return (
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

            <ul>
              <div className={styles.navigation}>
                <li>
                  <NavLink
                    className={`${styles.links} ${styles.promotions}`}
                    to={ROUTES.promotions}
                  >
                    Акції
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.links} to={ROUTES.about}>
                    Про нас
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.links} to={ROUTES.delivery}>
                    Доставка та оплата
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.links} to={ROUTES.handling}>
                    Догляд за квітами
                  </NavLink>
                </li>
              </div>
            </ul>
            <div className={styles.divider}>
              <Divider />
            </div>
            <div>
              <a className={styles.phoneLink} href="tel:+380937777777">
                <Button
                  variant="no-border"
                  label="(093) 777-77-77"
                  padding="padding-header-even"
                  reverse="true"
                  icon={<ICONS.phone />}
                />
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
              <span>
                <ICONS.person />
              </span>
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
  );
};

export default BurgerMenu;
