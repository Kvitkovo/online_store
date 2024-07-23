/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import BurgerMenu from './components/BurgerMenu';
import styles from './Header.module.scss';
import logo from '../../ui-kit/icons/logo/logo.svg';
import Button from '../../ui-kit/components/Button';
import { ICONS } from '../../ui-kit/icons';
import InputSearch from '../../ui-kit/components/Input/InputSearch';
import ROUTES from '../../../constants/routers';
import IconButton from '../../ui-kit/components/IconButton';
import { navigationItems } from './navigationItems';
import NavigationMenu from './components/NavigationMenu';
import CartPopup from '../../common/Cart';
import { useModalEffect } from '../../../hooks/useModalEffect';
import MyBouquet from '../../common/MyBouquet';
import Modal from '../../ui-kit/components/Modal';
import Catalog from '../../common/Catalog';
import { useDispatch, useSelector } from 'react-redux';

import TotalItems from './components/TotalItems';

import AuthModal from '../../login/AuthModal';
import { usePopups } from '../../../hooks/usePopups';

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [isCatalogOpened, setIsCatalogOpened] = useState(false);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);

  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  const dispatch = useDispatch();

  const toggleModal = () => {
    if (authToken) {
      navigate('/account');
    } else {
      setIsOpenAuthModal((prev) => !prev);
    }
  };

  const { cartItems, bouquetItems } = useSelector(
    (state) => state.cartSliceReducer,
  );

  const productQuantity = useMemo(() => {
    const quantity = cartItems.reduce(
      (accumulator, item) => accumulator + +item.cardQuantity,
      0,
    );
    return quantity;
  }, [cartItems]);
  const flowerQuantity = useMemo(
    () =>
      bouquetItems.reduce(
        (accumulator, item) => accumulator + +item.cardQuantity,
        0,
      ),
    [bouquetItems],
  );

  const catalogHandler = () => {
    setIsCatalogOpened((prev) => !prev);
  };
  const {
    isOpenCart,
    isOpenMyBouquet,
    toggleCart,
    toggleMyBouquet,
    getPrevData,
  } = usePopups();

  const openGoogleMaps = () => {
    const destination = 'вул. Квіткова, 18, Київ, Україна, 02000';

    const googleMapsLink =
      'https://www.google.com/maps/dir/?api=1' +
      `&destination=${encodeURIComponent(destination)}`;

    window.open(googleMapsLink, '_blank');
  };
  const location = useLocation();
  const openLoginModal = location.state && location.state.openLoginModal;

  useEffect(() => {
    if (openLoginModal) {
      setIsOpenAuthModal(true);
    }
  }, [openLoginModal]);

  useModalEffect(isOpenCart || isOpenMyBouquet || isOpenAuthModal);

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

  useEffect(() => {
    getPrevData('bouquet');
    getPrevData('cart');
  }, [dispatch, getPrevData]);

  return (
    <div>
      <BurgerMenu
        toggleCart={toggleCart}
        toggleMyBouquet={toggleMyBouquet}
        toggleLogin={toggleModal}
        cartQuantity={productQuantity}
        flowerQuantity={flowerQuantity}
      />
      <header>
        <div className={styles.containerTop}>
          <div className={styles.containerTopLeft}>
            <NavLink className={styles.logoLink} to={ROUTES.home}>
              <img
                className={styles.logo}
                src={logo}
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
                  onClick={openGoogleMaps}
                />
                <div className={styles.locationTooltip}>
                  <div>вул. Квіткова 18</div>
                  <ICONS.location />
                </div>
              </div>
              <a className={styles.phoneLink} href="tel:+380937777777">
                <ICONS.phone className={styles.phoneIcon} />
                (093) 777-77-77
              </a>
            </div>
          </div>
          <div className={styles.containerTopRight}>
            <NavigationMenu items={navigationItems} menuType="Header" />
            <span className={styles.verticalLine}></span>
            <div className={styles.tabletContacts}>
              <div className={styles.tabletIcon} onClick={openGoogleMaps}>
                <IconButton icon={<ICONS.location />} />
              </div>
              <div className={styles.tabletIcon}>
                <IconButton icon={<ICONS.phone />} />
              </div>
            </div>
            <p className={styles.language}>Укр</p>
          </div>
        </div>

        <div
          className={`${styles.containerBottom} ${sticky ? styles.sticky : ''}`}
        >
          <div className={styles.containerBottomLeft}>
            <div className={styles.btnCatalogue} id="catalog">
              <Button
                variant="primary"
                padding="padding-even"
                label="Каталог товарів"
                onClick={catalogHandler}
              />
            </div>
          </div>

          <div className={styles.searchField}>
            <InputSearch />
          </div>
          <div className={styles.containerBottomRight}>
            <div className={styles.bouquete}>
              <Button
                variant="no-border"
                label="Зібрати букет"
                icon={<ICONS.toBouquet />}
                onClick={toggleMyBouquet}
              />
              <TotalItems productQuantity={flowerQuantity} type={'Bouquet'} />
            </div>

            <div className={styles.login}>
              <Button
                variant="no-border"
                label={authToken ? 'Профіль' : 'Увійти'}
                icon={<ICONS.halfPerson />}
                onClick={toggleModal}
              />
            </div>
            <div className={styles.cart}>
              <IconButton onClick={toggleCart} icon={<ICONS.CartIcon />}>
                <TotalItems productQuantity={productQuantity} />
              </IconButton>
            </div>
          </div>
        </div>
      </header>
      {isOpenCart && (
        <CartPopup
          toggleCart={toggleCart}
          toggleMyBouquet={toggleMyBouquet}
          getBouquetData={getPrevData}
        />
      )}
      {isOpenMyBouquet && <MyBouquet toggleMyBouquet={toggleMyBouquet} />}
      {isOpenAuthModal && (
        <AuthModal isOpen={isOpenAuthModal} toggleModal={toggleModal} />
      )}
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
