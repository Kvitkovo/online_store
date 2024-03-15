/* eslint-disable max-len */
import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
import LoginModal from '../../login/LoginModal';
import RegisterModal from '../../login/RegisterModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/slices/userSlice';
import { GetProducts } from '../../../services/products/productsAccess.service';
import TotalItems from './components/TotalItems';
import { initiateCart } from '../../../redux/slices/cartSlice';

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [isCatalogOpened, setIsCatalogOpened] = useState(false);

  const navigate = useNavigate();
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const toggleLogin = () => {
    if (user && user.loggedIn) {
      navigate('/account');
    } else {
      setIsOpenLogin((prev) => !prev);
      setIsOpenRegister(false);
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

  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenMyBouquet, setIsOpenMyBouquet] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const toggleCart = useCallback(() => {
    setIsOpenCart((prev) => !prev);
  }, []);

  const toggleMyBouquet = useCallback(() => {
    setIsOpenMyBouquet((prev) => !prev);
  }, []);

  const toggleRegister = () => {
    setIsOpenLogin(false);
    setIsOpenRegister((prev) => !prev);
  };
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
      setIsOpenLogin(true);
    }
  }, [openLoginModal]);

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
  const getPrevData = useCallback(
    async (type) => {
      const prevList = JSON.parse(localStorage.getItem(type)) || [];
      const cartList = [];
      for (const item of prevList) {
        const { id, cardQuantity, orderItemsCompositions } = item;
        if (orderItemsCompositions) {
          const price = orderItemsCompositions.reduce((acc, item) => {
            acc + item.cardQuantity * item.priceWithDiscount;
          }, 0);
          const newItem = {
            id: id,
            title: `Свій букет #${id}`,
            cardQuantity: cardQuantity,
            discount: 0,
            image: '/images/new_bouquet.jpg',
            price: price,
            priceWithDiscount: price,
            orderItemsCompositions: orderItemsCompositions,
          };

          cartList.push(newItem);
        } else {
          const info = await GetProducts(item.id);
          const { id, images, title, price, priceWithDiscount } = info;
          const newItem = {
            id: id,
            title: title,
            price: price,
            priceWithDiscount: priceWithDiscount,
            image: images[0] ? images[0].urlSmall : '/images/no_image.jpg',
            cardQuantity: item.cardQuantity,
          };

          cartList.push(newItem);
        }
      }

      dispatch(
        initiateCart({
          items: cartList,
          type: type,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    getPrevData('bouquet');
    getPrevData('cart');
  }, [dispatch, getPrevData]);

  return (
    <div>
      <BurgerMenu
        toggleCart={toggleCart}
        toggleMyBouquet={toggleMyBouquet}
        toggleLogin={toggleLogin}
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
                label={user && user.loggedIn ? 'Профіль' : 'Увійти'}
                icon={<ICONS.halfPerson />}
                onClick={toggleLogin}
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
      {isOpenLogin && (
        <LoginModal toggleLogin={toggleLogin} toggleRegister={toggleRegister} />
      )}
      {isOpenRegister && (
        <RegisterModal
          toggleLogin={toggleLogin}
          toggleRegister={toggleRegister}
        />
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
