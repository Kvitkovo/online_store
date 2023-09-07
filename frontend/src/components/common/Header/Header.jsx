import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import Button from '../../ui-kit/components/Button';
import { ICONS } from '../../ui-kit/icons';

const Header = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header>
      <div className={styles.containerTop}>
        <div className={styles.leftTop}>
          {' '}
          <NavLink to="/">
            <img
              className={styles.logo}
              src="images/logo.svg"
              alt="логотип магазину 'Квітково'"
            />
          </NavLink>
          <div className={styles.location}>
            <ICONS.location />
            <p className={styles.text}>
              <b>Київ</b>
            </p>
          </div>
          <div className={styles.phone}>
            <img src="images/phone-icon.svg" alt="phone reciever" />
            <p className={styles.phoneNumber}>(093) 777-77-77</p>
          </div>
        </div>

        <ul>
          <li>
            <NavLink
              className={`${styles.links} ${styles.promotions}`}
              to="/promotions"
            >
              Акції
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.links} to="/about">
              Про нас
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.links} to="/delivery">
              Доставка та оплата
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.links} to="/handling">
              Догляд за квітами
            </NavLink>
          </li>
          <li className={styles.verticalLine}></li>
          <li className={styles.accessIcon}>
            <img
              src="images/access-icon.svg"
              alt="person with open arms for accessibility"
            />
          </li>
          <li>
            <button className={styles.btnLanguage}>Укр</button>
          </li>
        </ul>
      </div>

      <div
        className={`${styles.containerBottom} ${sticky ? styles.sticky : ''}`}
      >
        <Button
          variant="primary"
          padding="padding-even"
          label="Каталог товарів"
          onClick={() => alert('clicked primary')}
        />
        <div className={styles.search}>
          <input
            className={styles.searchField}
            type="search"
            placeholder="Пошук"
          />
        </div>

        <div className={styles.textIcon}>
          <p>Зібрати букет</p>
          <img
            src="images/bouquet-icon.svg"
            alt="three roses wraped in a boquete"
          />
        </div>

        <div className={styles.textIcon}>
          <p>Увійти</p>
          <img
            src="images/person-icon.svg"
            alt="person`s head and shoulders outline icon"
          />
        </div>

        <div className={styles.cart}>
          <img src="images/cart-icon.svg" alt="cart outline icon" />
        </div>
      </div>
    </header>
  );
};
export default Header;
