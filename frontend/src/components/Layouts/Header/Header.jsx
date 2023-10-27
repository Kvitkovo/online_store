import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import BurgerMenu from './components/BurgerMenu';
import styles from './Header.module.scss';
import Button from '../../ui-kit/components/Button';
import { ICONS } from '../../ui-kit/icons';
import InputSearch from '../../ui-kit/components/Input/InputSearch';
import ROUTES from '../../../constants/routers';
import IconButton from '../../ui-kit/components/IconButton';
import { navigationItems } from './navigationItems';
import NavigationMenu from './components/NavigationMenu';
import CartPopup from '../../common/Cart';
import { useModalEffect } from '../../../hooks/useModalEffect';
import MyBouquet from '../../common/MyBouquet/MyBouquet';
import Modal from '../../ui-kit/components/Modal';
import Catalog from '../../common/Catalog/Catalog';
import LoginModal from '../../common/LoginBtn/LoginModal';
import RegisterModal from '../../common/LoginBtn/RegisterModal/RegisterModal';

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [isCatalogOpened, setIsCatalogOpened] = useState(false);

  const catalogHandler = () => {
    setIsCatalogOpened((prev) => !prev);
  };

  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenMyBouquet, setIsOpenMyBouquet] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const toggleCart = () => {
    setIsOpenCart((prev) => !prev);
  };

  const toggleMyBouquet = () => {
    setIsOpenMyBouquet((prev) => !prev);
  };

  const toggleLogin = () => {
    setIsOpenRegister(false);
    setIsOpenLogin((prev) => !prev);
  };
  const toggleRegister = () => {
    setIsOpenRegister((prev) => !prev);
  };

  useModalEffect(isOpenCart, isOpenMyBouquet, isOpenLogin, isOpenRegister);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 70) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, []);
  return (
    <div>
      <BurgerMenu toggleCart={toggleCart} toggleMyBouquet={toggleMyBouquet} />
      <header>
        <div className={styles.containerTop}>
          {' '}
          <NavLink className={styles.logoLink} to={ROUTES.home}>
            <img
              className={styles.logo}
              src="/images/logo.svg"
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
              <ICONS.phone className={styles.phoneIcon} />
              (093) 777-77-77
            </a>
          </div>
          <NavigationMenu items={navigationItems} menuType="Header" />
          <span className={styles.verticalLine}></span>
          <div className={styles.accessIcon}>
            <IconButton icon={<ICONS.person />} />
          </div>
          <button className={styles.btnLanguage}>Укр</button>
        </div>

        <div
          className={`${styles.containerBottom} ${sticky ? styles.sticky : ''}`}
        >
          <div className={styles.btnCatalogue} id="catalog">
            <Button
              variant="primary"
              padding="padding-even"
              label="Каталог товарів"
              onClick={catalogHandler}
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
              onClick={toggleMyBouquet}
            />
            <div className={styles.login}>
              <Button
                variant="no-border"
                label="Увійти"
                padding="padding-header-even"
                icon={<ICONS.halfPerson />}
                onClick={toggleLogin}
              />
            </div>

            <div className={styles.cart}>
              <IconButton onClick={toggleCart} icon={<ICONS.CartIcon />} />
            </div>
          </div>
        </div>
      </header>
      {isOpenCart && <CartPopup toggleCart={toggleCart} />}
      {isOpenMyBouquet && <MyBouquet toggleMyBouquet={toggleMyBouquet} />}
      {isOpenLogin && (
        <LoginModal toggleLogin={toggleLogin} toggleRegister={toggleRegister} />
      )}
      {isOpenRegister && <RegisterModal toggleLogin={toggleRegister} />}
      <Modal
        isOpen={isCatalogOpened}
        setIsOpen={setIsCatalogOpened}
        nodeId="catalog"
      >
        <Catalog setIsOpen={setIsCatalogOpened} />
      </Modal>
    </div>
  );
};
export default Header;
