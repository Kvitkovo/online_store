import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import styles from './Header.module.scss';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';
import InputSearch from '../../../ui-kit/components/Input/InputSearch';
import ROUTES from '../../../constants/routers';

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
          <NavLink to={ROUTES.home}>
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
              <Button
                variant="no-border"
                label="(093) 777-77-77"
                padding="padding-header-even"
                reverse="true"
                icon={<ICONS.phone />}
              />
            </a>
          </div>
          <ul>
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
            <span className={styles.verticalLine}></span>
            <li className={styles.accessIcon}>
              <ICONS.person />
            </li>
            <button className={styles.btnLanguage}>Укр</button>
          </ul>
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
              <ICONS.CartIcon />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
